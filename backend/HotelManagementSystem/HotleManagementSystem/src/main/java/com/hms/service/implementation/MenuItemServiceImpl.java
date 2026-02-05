package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.MenuItem;
import com.hms.repository.MenuItemRepository;
import com.hms.service.MenuItemService;
import com.hms.dto.MenuItemDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public String addMenuItem(MenuItem menuItem) {
        if (menuItem.getName() == null || menuItem.getName().isEmpty()) {
            return "Menu item name is mandatory!";
        }
        if (menuItem.getPrice() == null || menuItem.getPrice() <= 0) {
            return "Price must be greater than zero!";
        }
        menuItemRepository.save(menuItem);
        return "Menu item added successfully!";
    }

    @Override
    public List<MenuItemDto> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemRepository.findAll();
        return menuItems.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public MenuItemDto getMenuItemById(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + menuItemId));
        return mapToDto(menuItem);
    }

    @Override
    public String updateMenuItem(Long menuItemId, MenuItem menuItem) {
        MenuItem existingMenuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + menuItemId));

        if (menuItem.getName() != null && !menuItem.getName().isEmpty()) {
            existingMenuItem.setName(menuItem.getName());
        }
        if (menuItem.getDescription() != null && !menuItem.getDescription().isEmpty()) {
            existingMenuItem.setDescription(menuItem.getDescription());
        }
        if (menuItem.getPrice() != null && menuItem.getPrice() > 0) {
            existingMenuItem.setPrice(menuItem.getPrice());
        }

        menuItemRepository.save(existingMenuItem);
        return "Menu item updated successfully!";
    }

    @Override
    public String deleteMenuItem(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + menuItemId));
        menuItemRepository.delete(menuItem);
        return "Menu item deleted successfully!";
    }

    private MenuItemDto mapToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .menuItemId(menuItem.getMenuItemId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .build();
    }
}
