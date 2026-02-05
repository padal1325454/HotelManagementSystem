package com.hms.service;

import com.hms.models.MenuItem;
import com.hms.dto.MenuItemDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface MenuItemService {
    String addMenuItem(MenuItem menuItem);
    List<MenuItemDto> getAllMenuItems();
    MenuItemDto getMenuItemById(Long menuItemId);
    String updateMenuItem(Long menuItemId, MenuItem menuItem);
    String deleteMenuItem(Long menuItemId);
}
