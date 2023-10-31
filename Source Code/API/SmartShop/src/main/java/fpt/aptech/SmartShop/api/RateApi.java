/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.entity.Rate;
import fpt.aptech.SmartShop.repository.OrderDetailRepository;
import fpt.aptech.SmartShop.repository.ProductRepository;
import fpt.aptech.SmartShop.repository.RateRepository;
import fpt.aptech.SmartShop.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/rates")
public class RateApi {
        @Autowired
	RateRepository rateRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	OrderDetailRepository orderDetailRepository;

	@Autowired
	ProductRepository productRepository;

	@GetMapping
	public ResponseEntity<List<Rate>> findAll() {
		return ResponseEntity.ok(rateRepository.findAllByOrderByIdDesc());
	}

	@GetMapping("{orderDetailId}")
	public ResponseEntity<Rate> findById(@PathVariable Long orderDetailId) {
		if (!orderDetailRepository.existsById(orderDetailId)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(rateRepository.findByOrderDetail(orderDetailRepository.findById(orderDetailId).get()));
	}

	@GetMapping("/product/{id}")
	public ResponseEntity<List<Rate>> findByProduct(@PathVariable("id") Long id) {
		if (!productRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(rateRepository.findByProductOrderByIdDesc(productRepository.findById(id).get()));
	}

	@PostMapping
	public ResponseEntity<Rate> post(@RequestBody Rate rate) {
		if (!userRepository.existsById(rate.getUser().getUserId())) {
			return ResponseEntity.notFound().build();
		}
		if (!productRepository.existsById(rate.getProduct().getProductId())) {
			return ResponseEntity.notFound().build();
		}
		if (!orderDetailRepository.existsById(rate.getOrderDetail().getOrderDetailId())) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(rateRepository.save(rate));
	}

	@PutMapping
	public ResponseEntity<Rate> put(@RequestBody Rate rate) {
		if (!rateRepository.existsById(rate.getId())) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(rateRepository.save(rate));
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
		if (!rateRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		rateRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
