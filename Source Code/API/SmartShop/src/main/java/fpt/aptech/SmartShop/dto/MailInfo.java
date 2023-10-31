/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.dto;

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
public class MailInfo {
        String from;
	String to;
	String subject;
	String body;
	String attachments;

	public MailInfo(String to, String subject, String body) {
                //đổi lại theo tên mà thích là đc                                                               
                //Ko cần config gì thêm đâu
		this.from = "SmartShop <smartshop@gmail.com>";
		this.to = to;
		this.subject = subject;
		this.body = body;
	}
}
