/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.utils;

import fpt.aptech.SmartShop.entity.Order;
import fpt.aptech.SmartShop.entity.OrderDetail;
import fpt.aptech.SmartShop.repository.OrderDetailRepository;
import fpt.aptech.SmartShop.repository.OrderRepository;
import fpt.aptech.SmartShop.service.SendMailService;
import org.springframework.stereotype.Service;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Admin
 */
@Service
public class SendMailUtil {
        @Autowired
	OrderRepository orderRepository;

	@Autowired
	OrderDetailRepository orderDetailRepository;

	@Autowired
	SendMailService sendMailService;

        //mail Order Success
	public void sendMailOrder(Order order) {
		SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
		List<OrderDetail> listOrderDetails = orderDetailRepository.findByOrder(order);
		StringBuilder content = new StringBuilder();
		content.append(HEADER);
		for (OrderDetail oderDetail : listOrderDetails) {
			content.append("<tr>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align: center;\">\r\n"
					+ "                                                        <img style=\"width: 85%;\" src="
					+ oderDetail.getProduct().getImage() + ">\r\n"
					+ "                                                    </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getProduct().getName() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getQuantity() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ format(String.valueOf(oderDetail.getPrice())) + " </td>\r\n"
					+ "                                                </tr>");
		}
		content.append(BODY2);
		content.append(
				"<td width=\"55%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\"> TOTAL : </td>\r\n"
						+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee; color: red;\"> "
						+ format(String.valueOf(order.getAmount())) + " </td>");
		content.append(BODY3);
		content.append(
				"<td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">DELIVERY ADDRESS</p>\r\n"
						+ "                                                            <p>" + order.getAddress()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">ORDER DATE</p>\r\n"
						+ "                                                            <p>"
						+ dt.format(order.getOrderDate()) + "</p>\r\n"
						+ "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">RECEIVER'S NAME</p>\r\n"
						+ "                                                            <p>" + order.getUser().getName()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">PHONE NUMBER</p>\r\n"
						+ "                                                            <p>" + order.getPhone()
						+ "</p>\r\n" + "                                                        </td>");
		content.append(FOOTER);
		sendMailService.queue(order.getUser().getEmail(), "Successful Ordered", content.toString());
	}

        //mail Paid Success
	public void sendMailOrderSuccess(Order order) {
		SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
		List<OrderDetail> listOrderDetails = orderDetailRepository.findByOrder(order);
		StringBuilder content = new StringBuilder();
		content.append(HEADERSUCCESS);
		for (OrderDetail oderDetail : listOrderDetails) {
			content.append("<tr>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align: center;\">\r\n"
					+ "                                                        <img style=\"width: 85%;\" src="
					+ oderDetail.getProduct().getImage() + ">\r\n"
					+ "                                                    </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getProduct().getName() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getQuantity() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ format(String.valueOf(oderDetail.getPrice())) + " </td>\r\n"
					+ "                                                </tr>");
		}
		content.append(BODY2);
		content.append(
				"<td width=\"55%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\"> TOTAL : </td>\r\n"
						+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee; color: red;\"> "
						+ format(String.valueOf(order.getAmount())) + " </td>");
		content.append(BODY3);
		content.append(
				"<td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">DELIVERY ADDRESS</p>\r\n"
						+ "                                                            <p>" + order.getAddress()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">ORDER DATE</p>\r\n"
						+ "                                                            <p>"
						+ dt.format(order.getOrderDate()) + "</p>\r\n"
						+ "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">RECEIVER'S NAME</p>\r\n"
						+ "                                                            <p>" + order.getUser().getName()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">PHONE NUMBER</p>\r\n"
						+ "                                                            <p>" + order.getPhone()
						+ "</p>\r\n" + "                                                        </td>");
		content.append(FOOTER);
		sendMailService.queue(order.getUser().getEmail(), "Successful Paid", content.toString());
	}
//mai Order Confirm
	public void sendMailOrderDeliver(Order order) {
		SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
		List<OrderDetail> listOrderDetails = orderDetailRepository.findByOrder(order);
		StringBuilder content = new StringBuilder();
		content.append(HEADERDELIVER);
		for (OrderDetail oderDetail : listOrderDetails) {
			content.append("<tr>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align: center;\">\r\n"
					+ "                                                        <img style=\"width: 85%;\" src="
					+ oderDetail.getProduct().getImage() + ">\r\n"
					+ "                                                    </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getProduct().getName() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getQuantity() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ format(String.valueOf(oderDetail.getPrice())) + " </td>\r\n"
					+ "                                                </tr>");
		}
		content.append(BODY2);
		content.append(
				"<td width=\"55%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\"> TOTAL : </td>\r\n"
						+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee; color: red;\"> "
						+ format(String.valueOf(order.getAmount())) + " </td>");
		content.append(BODY3);
		content.append(
				"<td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">DELIVERY ADDRESS</p>\r\n"
						+ "                                                            <p>" + order.getAddress()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">ORDER DATE</p>\r\n"
						+ "                                                            <p>"
						+ dt.format(order.getOrderDate()) + "</p>\r\n"
						+ "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">RECEIVER'S NAME</p>\r\n"
						+ "                                                            <p>" + order.getUser().getName()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">PHONE NUMBER</p>\r\n"
						+ "                                                            <p>" + order.getPhone()
						+ "</p>\r\n" + "                                                        </td>");
		content.append(FOOTER);
		sendMailService.queue(order.getUser().getEmail(), "Order Confirmed", content.toString());
	}
        
//mail Order Cancel
	public void sendMailOrderCancel(Order order) {
		SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
		List<OrderDetail> listOrderDetails = orderDetailRepository.findByOrder(order);
		StringBuilder content = new StringBuilder();
		content.append(HEADERCANCEL);
		for (OrderDetail oderDetail : listOrderDetails) {
			content.append("<tr>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;text-align: center;\">\r\n"
					+ "                                                        <img style=\"width: 85%;\" src="
					+ oderDetail.getProduct().getImage() + ">\r\n"
					+ "                                                    </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getProduct().getName() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ oderDetail.getQuantity() + " </td>\r\n"
					+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;\"> "
					+ format(String.valueOf(oderDetail.getPrice())) + " </td>\r\n"
					+ "                                                </tr>");
		}
		content.append(BODY2);
		content.append(
				"<td width=\"55%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\"> TOTAL :  </td>\r\n"
						+ "                                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee; color: red;\"> "
						+ format(String.valueOf(order.getAmount())) + " </td>");
		content.append(BODY3);
		content.append(
				"<td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">DELIVERY ADDRESS</p>\r\n"
						+ "                                                            <p>" + order.getAddress()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">ORDER DATE</p>\r\n"
						+ "                                                            <p>"
						+ dt.format(order.getOrderDate()) + "</p>\r\n"
						+ "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">RECEIVER'S NAME</p>\r\n"
						+ "                                                            <p>" + order.getUser().getName()
						+ "</p>\r\n" + "                                                        </td>\r\n"
						+ "                                                    </tr>\r\n"
						+ "                                                </table>\r\n"
						+ "                                            </div>\r\n"
						+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
						+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
						+ "                                                    <tr>\r\n"
						+ "                                                        <td align=\"center\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">\r\n"
						+ "                                                            <p style=\"font-weight: 800;\">PHONE NUMBER</p>\r\n"
						+ "                                                            <p>" + order.getPhone()
						+ "</p>\r\n" + "                                                        </td>");
		content.append(FOOTER);
		sendMailService.queue(order.getUser().getEmail(), "Order Canceled", content.toString());
	}

        //format mail
	public String format(String number) {
		DecimalFormat formatter = new DecimalFormat("###,###,###.##");

		return formatter.format(Double.valueOf(number)) + " USD";
	}
//confirm order
	static String HEADERDELIVER = "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #fcb800;\" bgcolor=\"#fcb800\">\r\n"
			+ "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\r\n"
			+ "        Smart Shop - Copyrights \r\n" + "    </div>\r\n"
			+ "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n" + "        <tr>\r\n"
			+ "            <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\r\n"
			+ "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#fcb800\">\r\n"
			+ "                            <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\r\n"
			+ "                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\r\n"
			+ "                                            <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697443558/users/mxpmryfu375per6biqcd.png\" width=\"220px\"/>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "                                </table>\r\n" + "                            </div>\r\n"
			+ "                            \r\n" + "                        </td>\r\n" + "                    </tr>\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                                <tr>\r\n"
			+ "                                    <td align=\"center\" style=\"font-family: Open sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;\">\r\n"
			+ "                                        <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697448056/users/ykopzn1gwyssitbyxrvw.png\" width=\"115\" height=\"110\" style=\"display: block; border: 0px;\" /><br>\r\n"
			+ "                                        <h2 style=\"font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;\"> Thank You For Your Order ! </h2>\r\n"
			+ "                                        <p style=\"font-family: Open sans-serif; font-size: 18px;\"><em>Your order is being packaged and handed over to the shipping carrier</em></p>\r\n"
			+ "                                        <p style=\"font-family: Open sans-serif; font-size: 18px;\"><em>We will deliver your order as soon as possible !</em></p>\r\n"
			+ "                                    </td>\r\n" + "                                </tr>\r\n"
			+ "                                \r\n" + "                                <tr>\r\n"
			+ "                                    <td align=\"left\" style=\"padding-top: 20px;\">\r\n"
			+ "                                        <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\r\n"
			+ "                                            <p style=\"font-size: 20px;font-family: Open sans-serif; text-decoration: underline; width: 200px;\">YOUR ORDER:</p>\r\n"
			+ "                                            <tr>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">#</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">NAME</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">QUANTITY</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">SUBTOTAL</td>\r\n"
			+ "                                            </tr>";

//payment success
	static String HEADERSUCCESS = "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #fcb800;\" bgcolor=\"#fcb800\">\r\n"
			+ "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\r\n"
			+ "        Smart Shop - Copyrights \r\n" + "    </div>\r\n"
			+ "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n" + "        <tr>\r\n"
			+ "            <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\r\n"
			+ "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#fcb800\">\r\n"
			+ "                            <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\r\n"
			+ "                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\r\n"
			+ "                                            <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697443558/users/mxpmryfu375per6biqcd.png\" width=\"220px\"/>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "                                </table>\r\n" + "                            </div>\r\n"
			+ "                            \r\n" + "                        </td>\r\n" + "                    </tr>\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                                <tr>\r\n"
			+ "                                    <td align=\"center\" style=\"font-family: Open sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;\">\r\n"
			+ "                                        <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697449660/users/bxcghxtobbscozlcxhps.png\" width=\"115\" height=\"110\" style=\"display: block; border: 0px;\" /><br>\r\n"
			+ "                                        <h2 style=\"font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;\"> Successful Payment </h2>\r\n"
			+ "                                        <p style=\"font-family: Open sans-serif; font-size: 18px;\"><em>Thank you for your trust! We hope you are satisfied with the quality of this product and will continue to support us.</em></p>\r\n"
			+ "                                    </td>\r\n" + "                                </tr>\r\n"
			+ "                                \r\n" + "                                <tr>\r\n"
			+ "                                    <td align=\"left\" style=\"padding-top: 20px;\">\r\n"
			+ "                                        <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\r\n"
			+ "                                            <p style=\"font-size: 20px;font-family: Open sans-serif; text-decoration: underline; width: 200px;\">YOUR ORDER:</p>\r\n"
			+ "                                            <tr>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">#</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">NAME</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">QUANTITY</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">SUBTOTAL</td>\r\n"
			+ "                                            </tr>";

//cancel order
	static String HEADERCANCEL = "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #fcb800;\" bgcolor=\"#fcb800\">\r\n"
			+ "    <div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\r\n"
			+ "        Smart Shop - Copyrights \r\n" + "    </div>\r\n"
			+ "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n" + "        <tr>\r\n"
			+ "            <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\r\n"
			+ "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#fcb800\">\r\n"
			+ "                            <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\r\n"
			+ "                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\r\n"
			+ "                                            <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697443558/users/mxpmryfu375per6biqcd.png\" width=\"220px\"/>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "                                </table>\r\n" + "                            </div>\r\n"
			+ "                            \r\n" + "                        </td>\r\n" + "                    </tr>\r\n"
			+ "                    <tr>\r\n"
			+ "                        <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                            <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                                <tr>\r\n"
			+ "                                    <td align=\"center\" style=\"font-family: Open sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;\">\r\n"
			+ "                                        <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697448893/users/wqsckofkkv9bdnqircds.png\" width=\"115\" height=\"110\" style=\"display: block; border: 0px;\" /><br>\r\n"
			+ "                                        <h2 style=\"font-family: Open sans-serif;font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;\">Your Order Has Been Cancelled ! </h2>\r\n"
			+ "                                        <p style=\"font-family: Open sans-serif; font-size: 18px;\"><em>We apologize for the inconvenience, and we hope to see you again!</em></p>\r\n"
			+ "                                    </td>\r\n" + "                                </tr>\r\n"
			+ "                                \r\n" + "                                <tr>\r\n"
			+ "                                    <td align=\"left\" style=\"padding-top: 20px;\">\r\n"
			+ "                                        <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\r\n"
			+ "                                            <p style=\"font-size: 20px;font-family: Open sans-serif; text-decoration: underline; width: 200px;\">YOUR ORDER:</p>\r\n"
			+ "                                            <tr>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">#</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">NAME</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">QUANTITY</td>\r\n"
			+ "                                                <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">SUBTOTAL</td>\r\n"
			+ "                                            </tr>";

//order success
	static String HEADER = "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #fcb800;\" bgcolor=\"#fcb800\">\r\n"
			+ "        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n"
			+ "            <tr>\r\n"
			+ "                <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\r\n"
			+ "                    <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                        <tr>\r\n"
			+ "                            <td align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#fcb800\">\r\n"
			+ "                                <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\r\n"
			+ "                                    <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                        <tr>\r\n"
			+ "                                            <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\r\n"
			+ "                                                <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697443558/users/mxpmryfu375per6biqcd.png\" width=\"220px\" />\r\n"
			+ "                                            </td>\r\n"
			+ "                                        </tr>\r\n" + "                                    </table>\r\n"
			+ "                                </div>\r\n" + "\r\n" + "                            </td>\r\n"
			+ "                        </tr>\r\n" + "                        <tr>\r\n"
			+ "                            <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"center\" style=\"font-family: Open sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;\">\r\n"
			+ "                                            <img src=\"https://res.cloudinary.com/martfury/image/upload/v1697448910/users/cwy0vsanzhqxxdplsfai.png\" width=\"115\" height=\"110\" style=\"display: block; border: 0px;\" /><br>\r\n"
			+ "                                            <h2 style=\"font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;\"> Your Order Has Been Placed ! </h2>\r\n"
			+ "                                            <p style=\"font-family: Open sans-serif; font-size: 18px;\"><em>We will process your order as soon as possible. Please wait patiently!</em></p>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "\r\n" + "                                    <tr>\r\n"
			+ "                                        <td align=\"left\" style=\"padding-top: 20px;\">\r\n"
			+ "                                            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\r\n"
			+ "                                                <p style=\"font-size: 20px;font-family: Open sans-serif; text-decoration: underline; width: 200px;\">YOUR ORDER:</p>\r\n"
			+ "                                                <tr>\r\n"
			+ "                                                    <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">#</td>\r\n"
			+ "                                                    <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">NAME</td>\r\n"
			+ "                                                    <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">QUANTITY</td>\r\n"
			+ "                                                    <td width=\"25%\" align=\"left\" bgcolor=\"#eeeeee\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 800; line-height: 24px; padding: 10px;\">SUBTOTAL</td>\r\n"
			+ "                                                </tr>";
	static String BODY2 = "</table>\r\n" + "                                        </td>\r\n"
			+ "                                    </tr>\r\n" + "                                    <tr>\r\n"
			+ "                                        <td align=\"left\" style=\"padding-top: 20px;\">\r\n"
			+ "                                            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\r\n"
			+ "                                                <tr>";
	static String BODY3 = "</tr>\r\n" + "                                            </table>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "                                </table>\r\n" + "                            </td>\r\n"
			+ "                        </tr>\r\n" + "                        <tr>\r\n"
			+ "                            <td align=\"center\" height=\"100%\" valign=\"top\" width=\"100%\" style=\"padding: 0 35px 35px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:660px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"center\" valign=\"top\" style=\"font-size:0;\">\r\n"
			+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
			+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                                    <tr>\r\n"
			+ "                                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">";
	static String BODY4 = "</td>\r\n" + "                                                    </tr>\r\n"
			+ "                                                </table>\r\n"
			+ "                                            </div>\r\n"
			+ "                                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\r\n"
			+ "                                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\r\n"
			+ "                                                    <tr>\r\n"
			+ "                                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open sans-serif; font-size: 20px; font-weight: 400; line-height: 24px;\">";
	static String FOOTER = "</tr>\r\n" + "                                                </table>\r\n"
			+ "                                            </div>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "                                </table>\r\n" + "                            </td>\r\n"
			+ "                        </tr>\r\n" + "\r\n" + "                        <tr>\r\n"
			+ "                            <td align=\"center\" style=\"padding: 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\r\n"
			+ "                                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\r\n"
			+ "                                    <tr>\r\n"
			+ "                                        <td align=\"center\" style=\"font-family: Open sans-serif; font-size: 18px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;\">\r\n"
			+ "                                            <p style=\"font-size: 18px; font-weight: 800; line-height: 18px; color: #fcb800;\"> Smart Shop - Copyrights 2023 </p>\r\n"
			+ "                                            <p style=\"font-family: Open sans-serif;\">Thank you for trusting us - Wishing you a happy day!</p>\r\n"
			+ "                                        </td>\r\n" + "                                    </tr>\r\n"
			+ "\r\n" + "                                </table>\r\n" + "                            </td>\r\n"
			+ "                        </tr>\r\n" + "                    </table>\r\n" + "                </td>\r\n"
			+ "            </tr>\r\n" + "        </table>\r\n" + "    </body>";
}
