package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.MenuItem;
import com.hms.dto.MenuItemDto;
import com.hms.service.MenuItemService;

import java.util.List;

@RestController
@RequestMapping("/api/menuitems")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    // Add a new menu item
    @PostMapping
    public ResponseEntity<String> addMenuItem(@RequestBody MenuItem menuItem) {
        String response = menuItemService.addMenuItem(menuItem);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all menu items
    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        List<MenuItemDto> menuItems = menuItemService.getAllMenuItems();
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    // Get a menu item by ID
    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDto> getMenuItemById(@PathVariable Long id) {
        MenuItemDto menuItem = menuItemService.getMenuItemById(id);
        return new ResponseEntity<>(menuItem, HttpStatus.OK);
    }

    // Update a menu item
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        String response = menuItemService.updateMenuItem(id, menuItem);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a menu item
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
        String response = menuItemService.deleteMenuItem(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
