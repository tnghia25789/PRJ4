/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;

import fpt.aptech.SmartShop.entity.Cart;
import fpt.aptech.SmartShop.entity.CartDetail;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Admin
 */
@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
        List<CartDetail> findByCart(Cart cart);

	void deleteByCart(Cart cart);
}
