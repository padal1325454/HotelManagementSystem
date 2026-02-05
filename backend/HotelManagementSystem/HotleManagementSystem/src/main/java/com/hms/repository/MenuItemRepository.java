package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.MenuItem;
@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

}
