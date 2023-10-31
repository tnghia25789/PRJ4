/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.dto;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 *
 * @author Admin
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
        private String name;
	private String email;
	private String password;
	private String phone;
	private String address;
	private Boolean gender;
	private Boolean status;
	private String image;
	private LocalDate registerDate;

	private Set<String> role;
}
