/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.SmartShop.api;

import fpt.aptech.SmartShop.config.JwtUtils;
import fpt.aptech.SmartShop.dto.JwtResponse;
import fpt.aptech.SmartShop.dto.LoginRequest;
import fpt.aptech.SmartShop.dto.MessageResponse;
import fpt.aptech.SmartShop.dto.SignupRequest;
import fpt.aptech.SmartShop.entity.AppRole;
import fpt.aptech.SmartShop.entity.Cart;
import fpt.aptech.SmartShop.entity.User;
import fpt.aptech.SmartShop.implement.UserDetailsImpl;
import fpt.aptech.SmartShop.repository.AppRoleRepository;
import fpt.aptech.SmartShop.repository.CartRepository;
import fpt.aptech.SmartShop.repository.UserRepository;
import fpt.aptech.SmartShop.service.SendMailService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/auth")
public class UserApi {
    
    //hàm thư viện
    @Autowired
    AuthenticationManager authenticationManager;

    //services
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    AppRoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    SendMailService sendMailService;
    
    
    //Lấy lên list customers ko bị block, kiểm tra bằng status
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userRepository.findByStatusTrue());
    }

    
    //lấy 1 user thông qua id
    @GetMapping("{id}")
    public ResponseEntity<User> getOne(@PathVariable("id") Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userRepository.findById(id).get());
    }

    
    //kiểm tra email tồn tại hay chưa
    @GetMapping("email/{email}")
    public ResponseEntity<User> getOneByEmail(@PathVariable("email") String email) {
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.ok(userRepository.findByEmail(email).get());
        }
        return ResponseEntity.notFound().build();
    }

    
    //thêm mới 1 user
    @PostMapping
    public ResponseEntity<User> post(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.notFound().build();
        }
        if (userRepository.existsById(user.getUserId())) {
            return ResponseEntity.badRequest().build();
        }

        Set<AppRole> roles = new HashSet<>();
        roles.add(new AppRole(1, null));

        user.setRoles(roles);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setToken(jwtUtils.doGenerateToken(user.getEmail()));
        User u = userRepository.save(user);
        Cart c = new Cart(0L, 0.0, u.getAddress(), u.getPhone(), u);
        cartRepository.save(c);
        return ResponseEntity.ok(u);
    }

    
    //cập nhật thông tin cho customer
    @PutMapping("{id}")
    public ResponseEntity<User> put(@PathVariable("id") Long id, @RequestBody User user) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (!id.equals(user.getUserId())) {
            return ResponseEntity.badRequest().build();
        }

        User temp = userRepository.findById(id).get();

        if (!user.getPassword().equals(temp.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        Set<AppRole> roles = new HashSet<>();
        roles.add(new AppRole(1, null));

        user.setRoles(roles);
        return ResponseEntity.ok(userRepository.save(user));
    }

    
    //cập nhật thông tin cho admin
    @PutMapping("admin/{id}")
    public ResponseEntity<User> putAdmin(@PathVariable("id") Long id, @RequestBody User user) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (!id.equals(user.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        Set<AppRole> roles = new HashSet<>();
        roles.add(new AppRole(2, null));

        user.setRoles(roles);
        return ResponseEntity.ok(userRepository.save(user));
    }

    
    //block customer
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        User u = userRepository.findById(id).get();
        u.setStatus(false);
        userRepository.save(u);
        return ResponseEntity.ok().build();
    }

    
    //đăng nhập
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        if (userDetails.getStatus() == true) {
            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getName(),
                    userDetails.getEmail(), userDetails.getPassword(), userDetails.getPhone(), userDetails.getAddress(),
                    userDetails.getGender(), userDetails.getStatus(), userDetails.getImage(), userDetails.getRegisterDate(),
                    roles));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    
    //đăng ký cho customer
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signupRequest) {

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        //tạo mới user account
        User user = new User(signupRequest.getName(), signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getPhone(),
                signupRequest.getAddress(), signupRequest.getGender(), signupRequest.getStatus(),
                signupRequest.getImage(), signupRequest.getRegisterDate(),
                jwtUtils.doGenerateToken(signupRequest.getEmail()));
        Set<AppRole> roles = new HashSet<>();
        roles.add(new AppRole(1, null));

        user.setRoles(roles);
        userRepository.save(user);
        Cart c = new Cart(0L, 0.0, user.getAddress(), user.getPhone(), user);
        cartRepository.save(c);
        return ResponseEntity.ok(new MessageResponse("Registration Successful !"));

    }

    
    //đăng xuất
    @GetMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
    
    
    //gửi mail change mật khẩu
    @PostMapping("send-mail-change-password-token")
    public ResponseEntity<String> sendToken2(@RequestBody String email) {

        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.notFound().build();
        }
        User user = userRepository.findByEmail(email).get();
        String token = user.getToken();
        sendMaiToken2(email, token, "Change Password");
        return ResponseEntity.ok().build();

    }
    //gửi mail để change mật khẩu
    public void sendMaiToken2(String email, String token, String title) {
        String body = "\r\n" + "    <h2>Click the link below to change your password. Thank you to be a member of Smart Shop</h2>\r\n"
                + "    <a href=\"http://localhost:8080/change-password/" + token + "\">This is a link to change your password</a>";
        sendMailService.queue(email, title, body);
    }

    
    //gửi mail reset mật khẩu
    @PostMapping("send-mail-forgot-password-token")
    public ResponseEntity<String> sendToken(@RequestBody String email) {

        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.notFound().build();
        }
        User user = userRepository.findByEmail(email).get();
        String token = user.getToken();
        sendMaiToken(email, token, "Reset Password");
        return ResponseEntity.ok().build();

    }
    //gửi mail để reset mật khẩu
    public void sendMaiToken(String email, String token, String title) {
        String body = "\r\n" + "    <h2>Click the link below to reset your password. Thank you to be a member of Smart Shop</h2>\r\n"
                + "    <a href=\"http://localhost:8080/forgot-password/" + token + "\">This is a link to reset your password</a>";
        sendMailService.queue(email, title, body);
    }
}
