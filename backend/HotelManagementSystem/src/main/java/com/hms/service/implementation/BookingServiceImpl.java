package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Booking;
import com.hms.models.BookingRoom;
import com.hms.models.Guest;
import com.hms.models.Room;
import com.hms.models.User;
import com.hms.repository.BookingRepository;
import com.hms.repository.BookingRoomRepository;
import com.hms.repository.GuestRepository;
import com.hms.repository.RoomRepository;
import com.hms.repository.UserRepository;
import com.hms.service.BookingService;
import com.hms.dto.BookingDto;
import com.hms.dto.ExistingGuestBookingRequestDto;
import com.hms.dto.GuestDto;
import com.hms.dto.NewGuestBookingRequest;
import com.hms.enums.BookingStatus;
import com.hms.enums.Role;
import com.hms.enums.RoomStatus;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;

    @Override
    public BookingDto addBooking(Booking booking) {
        if (booking.getGuest() == null) throw new IllegalArgumentException("Guest info is mandatory");
        if (booking.getCheckIn() == null || booking.getCheckOut() == null)
            throw new IllegalArgumentException("Check-in and check-out dates are required");
        bookingRepository.save(booking);
        return mapToDto(booking);
    }

    
    @Override
    public List<BookingDto> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BookingDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        return mapToDto(booking);
    }

    @Override
    public BookingDto updateBooking(Long bookingId, Booking booking) {
        Booking existingBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() != null) {
            existingBooking.setStatus(booking.getStatus());

            List<BookingRoom> bookingRooms = bookingRoomRepository.findByBooking(existingBooking);
            for (BookingRoom br : bookingRooms) {
                Room room = br.getRoom();
                if (booking.getStatus() == BookingStatus.CANCELLED) {
                    room.setStatus(RoomStatus.AVAILABLE);
                } else if (booking.getStatus() == BookingStatus.COMPLETED) {
                    room.setStatus(RoomStatus.CLEANING);
                } else if (booking.getStatus() == BookingStatus.CONFIRMED) {
                    room.setStatus(RoomStatus.OCCUPIED);
                }
                roomRepository.save(room);
            }
        }

        if (booking.getGuest() != null) existingBooking.setGuest(booking.getGuest());
        if (booking.getCheckIn() != null) existingBooking.setCheckIn(booking.getCheckIn());
        if (booking.getCheckOut() != null) existingBooking.setCheckOut(booking.getCheckOut());

        bookingRepository.save(existingBooking);
        return mapToDto(existingBooking);
    }

    @Override
    public String deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        
        // Get associated rooms and set them to AVAILABLE
        List<BookingRoom> bookingRooms = bookingRoomRepository.findByBooking(booking);
        for (BookingRoom bookingRoom : bookingRooms) {
            Room room = bookingRoom.getRoom();
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }
        
        // Delete booking rooms first to maintain referential integrity
        bookingRoomRepository.deleteAll(bookingRooms);
        bookingRepository.delete(booking);
        
        return "Booking deleted successfully. Associated rooms set to AVAILABLE.";
    }
    
    @Override
    public GuestDto getGuestByEmail(String email) {
        // Retrieve the booking using the user's email
        Booking existingBooking = bookingRepository.findByGuest_User_Email(email);

        if (existingBooking == null) {
            throw new RuntimeException("No booking found for the given email: " + email);
        }

        // Extract the guest details from the booking
        Guest guest = existingBooking.getGuest();

        // Convert Guest to GuestDto (assuming GuestDto exists)
        return GuestDto.builder()
                .guestId(guest.getGuestId())
                .name(guest.getUser().getName()) // Assuming GuestDto has a name field
                .contactInfo(guest.getContactInfo())
                .address(guest.getAddress())
                .build();
    }
    private BookingDto mapToDto(Booking booking) {
        Room room = bookingRoomRepository.findByBooking(booking)
                .stream().findFirst().map(BookingRoom::getRoom).orElse(null);

        return BookingDto.builder()
                .bookingId(booking.getBookingId())
                .guestName(booking.getGuest().getUser().getName())
                .roomId(room != null ? room.getRoomId() : null)
                .roomType(room != null ? room.getRoomType().getName() : null)
                .checkIn(booking.getCheckIn())
                .checkOut(booking.getCheckOut())
                .status(booking.getStatus())
                .build();
    }

    
    @Override
    public BookingDto createBookingForNewGuest(NewGuestBookingRequest request) {
        User user = userRepository.findByEmail(request.getGuestEmail());
        if (user == null) {
            user = User.builder()
                    .name(request.getGuestName())
                    .email(request.getGuestEmail())
                    .password(request.getGuestName().substring(0, 2) + "@123")
                    .role(Role.GUEST)
                    .build();
            userRepository.save(user);
        }

        Guest guest = guestRepository.findByUser(user);
        if (guest == null) {
            guest = Guest.builder()
                    .user(user)
                    .contactInfo(request.getContactInfo())
                    .address(request.getAddress())
                    .build();
            guestRepository.save(guest);
        }

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        Booking booking = Booking.builder()
                .guest(guest)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .status(request.getStatus())
                .build();
        bookingRepository.save(booking);

        BookingRoom bookingRoom = BookingRoom.builder()
                .booking(booking)
                .room(room)
                .build();
        bookingRoomRepository.save(bookingRoom);

        if (request.getStatus() == BookingStatus.CONFIRMED) {
            room.setStatus(RoomStatus.OCCUPIED);
            roomRepository.save(room);
        }

        return mapToDto(booking);
    }
    
    @Override
    public BookingDto createBookingForExistingGuest(ExistingGuestBookingRequestDto request) {
        Guest guest = guestRepository.findById(request.getGuestId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        Booking booking = Booking.builder()
                .guest(guest)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .status(request.getStatus())
                .build();
        bookingRepository.save(booking);

        BookingRoom bookingRoom = BookingRoom.builder()
                .booking(booking)
                .room(room)
                .build();
        bookingRoomRepository.save(bookingRoom);

        if (request.getStatus() == BookingStatus.CONFIRMED) {
            room.setStatus(RoomStatus.OCCUPIED);
            roomRepository.save(room);
        }

        return mapToDto(booking);
    }


}
