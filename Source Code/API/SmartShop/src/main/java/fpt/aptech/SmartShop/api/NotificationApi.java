/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.entity.Notification;
import fpt.aptech.SmartShop.repository.NotificationRepository;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@CrossOrigin("*")
@RequestMapping("api/notification")
public class NotificationApi {
        @Autowired
	NotificationRepository notificationRepository;

	@GetMapping
	public ResponseEntity<List<Notification>> getAll() {
		return ResponseEntity.ok(notificationRepository.findByOrderByIdDesc());
	}

	@PostMapping
	public ResponseEntity<Notification> post(@RequestBody Notification notification) {
		if (notificationRepository.existsById(notification.getId())) {
			return ResponseEntity.badRequest().build();
		}
		notification.setTime(new Date());
		notification.setStatus(false);
		return ResponseEntity.ok(notificationRepository.save(notification));
	}

	@GetMapping("/readed/{id}")
	public ResponseEntity<Notification> put(@PathVariable("id") Long id) {
		if (!notificationRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		Notification no = notificationRepository.getById(id);
		no.setStatus(true);
		return ResponseEntity.ok(notificationRepository.save(no));
	}

	@GetMapping("/read-all")
	public ResponseEntity<Void> readAll() {
		notificationRepository.readAll();
		return ResponseEntity.ok().build();
	}

}
