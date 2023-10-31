/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.config;


import fpt.aptech.SmartShop.handler.NotificationWebSocketHandle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 *
 * @author Admin
 */
@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer{
        private final static String NOTIFICATION_ENDPOINT = "/notification";

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
		webSocketHandlerRegistry.addHandler(getNotificationWebSocketHandler(), NOTIFICATION_ENDPOINT)
				.setAllowedOrigins("*");
	}

	@Bean
	public WebSocketHandler getNotificationWebSocketHandler() {
		return new NotificationWebSocketHandle();
	}
}
