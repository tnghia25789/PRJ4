/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.PRJ.Repositories;

import fpt.aptech.PRJ.Entities.Producer;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ruava
 */
public interface ProducerRepository extends JpaRepository<Producer, Integer> {
    
}
