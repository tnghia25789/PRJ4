/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.repository.UserRepository;
import fpt.aptech.SmartShop.service.SendMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/send-mail")
public class SendMailApi {
        @Autowired
	SendMailService sendMail;

	@Autowired
	UserRepository Urepo;

	@PostMapping("/otp")
	public ResponseEntity<Integer> sendOpt(@RequestBody String email) {
		int random_otp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		if (Urepo.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		sendMailOtp(email, random_otp, "Account Verification");
		return ResponseEntity.ok(random_otp);
	}

	// sendmail
	public void sendMailOtp(String email, int Otp, String title) {
		String body = "<div>\r\n" + "        <h3>Your OTP is : <span style=\"color:red; font-weight: bold;\">"
				+ Otp + "</span></h3>\r\n" + "    </div>";
		sendMail.queue(email, title, body);
	}
}
