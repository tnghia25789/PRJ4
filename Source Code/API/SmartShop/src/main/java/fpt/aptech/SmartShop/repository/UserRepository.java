/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;


import fpt.aptech.SmartShop.entity.User;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Admin
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        List<User> findByStatusTrue();

	Boolean existsByEmail(String email);

	Optional<User> findByEmail(String username);

	User findByToken(String token);
}
