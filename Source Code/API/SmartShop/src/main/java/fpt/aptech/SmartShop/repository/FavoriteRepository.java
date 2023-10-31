/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;

import fpt.aptech.SmartShop.entity.Favorite;
import fpt.aptech.SmartShop.entity.Product;
import fpt.aptech.SmartShop.entity.User;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Admin
 */
@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
        List<Favorite> findByUser(User user);

	Integer countByProduct(Product product);

	Favorite findByProductAndUser(Product product, User user);

}
