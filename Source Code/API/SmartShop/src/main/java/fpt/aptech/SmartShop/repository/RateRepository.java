/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;

import fpt.aptech.SmartShop.entity.OrderDetail;
import fpt.aptech.SmartShop.entity.Product;
import fpt.aptech.SmartShop.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Admin
 */
@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
        List<Rate> findAllByOrderByIdDesc();

	Rate findByOrderDetail(OrderDetail orderDetail);

	List<Rate> findByProductOrderByIdDesc(Product product);
}
