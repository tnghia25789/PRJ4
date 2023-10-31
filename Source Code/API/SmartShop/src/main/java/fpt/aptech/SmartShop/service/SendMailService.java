/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.service;

import fpt.aptech.SmartShop.dto.MailInfo;
import java.io.IOException;

import javax.mail.MessagingException;

/**
 *
 * @author Admin
 */
public interface SendMailService {
        void run();

	void queue(String to, String subject, String body);

	void queue(MailInfo mail);

	void send(MailInfo mail) throws MessagingException, IOException;

}
