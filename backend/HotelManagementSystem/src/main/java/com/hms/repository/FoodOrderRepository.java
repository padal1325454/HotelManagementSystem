package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.FoodOrder;
@Repository
public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {

}
