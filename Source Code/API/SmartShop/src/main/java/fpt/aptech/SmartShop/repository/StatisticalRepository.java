/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.repository;

import fpt.aptech.SmartShop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Admin
 */
@Repository
public interface StatisticalRepository extends JpaRepository<Product, Long> {
        @Query(value = "select sum(amount), month(order_date) from orders where year(order_date) = ? and status = 2 group by month(order_date)", nativeQuery = true)
	List<Object[]> getMonthOfYear(int year);

	@Query(value = "select year(order_date) from orders group by year(order_date)", nativeQuery = true)
	List<Integer> getYears();

	@Query(value = "select sum(amount) from orders where year(order_date) = ? and status = 2", nativeQuery = true)
	Double getRevenueByYear(int year);

	@Query(value = "select sum(p.sold), c.category_name, (p.price*sum(p.sold)-(p.discount)*sum(p.sold)) from categories c\r\n"
			+ "join products p on p.category_id = c.category_id\r\n"
			+ "group by c.category_name order by sum(p.sold) desc", nativeQuery = true)
	List<Object[]> getCategoryBestSeller();
}
