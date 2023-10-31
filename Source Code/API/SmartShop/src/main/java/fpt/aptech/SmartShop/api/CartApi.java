/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.entity.Cart;
import fpt.aptech.SmartShop.repository.CartDetailRepository;
import fpt.aptech.SmartShop.repository.CartRepository;
import fpt.aptech.SmartShop.repository.UserRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Admin
 */

@CrossOrigin("*")
@RestController
@RequestMapping("api/cart")
public class CartApi {
        @Autowired
	CartRepository cartRepository;

	@Autowired
	CartDetailRepository cartDetailRepository;

	@Autowired
	UserRepository userRepository;

	@GetMapping("/user/{email}")
	public ResponseEntity<Cart> getCartUser(@PathVariable("email") String email) {
		if (!userRepository.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cartRepository.findByUser(userRepository.findByEmail(email).get()));
	}

	@PutMapping("/user/{email}")
	public ResponseEntity<Cart> putCartUser(@PathVariable("email") String email, @RequestBody Cart cart) {
		if (!userRepository.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cartRepository.save(cart));
	}
}
