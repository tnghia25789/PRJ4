/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;

import fpt.aptech.SmartShop.entity.Order;
import fpt.aptech.SmartShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Admin
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
        List<Order> findByUser(User user);

	List<Order> findByUserOrderByOrdersIdDesc(User user);

	List<Order> findAllByOrderByOrdersIdDesc();

	List<Order> findByStatus(int status);
}
