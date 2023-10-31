/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.entity.OrderDetail;
import fpt.aptech.SmartShop.repository.OrderDetailRepository;
import fpt.aptech.SmartShop.repository.OrderRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/orderDetail")
public class OderDetailApi {
        @Autowired
	OrderDetailRepository orderDetailRepository;

	@Autowired
	OrderRepository orderRepository;

	@GetMapping("/order/{id}")
	public ResponseEntity<List<OrderDetail>> getByOrder(@PathVariable("id") Long id) {
		if (!orderRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(orderDetailRepository.findByOrder(orderRepository.findById(id).get()));
	}

}
