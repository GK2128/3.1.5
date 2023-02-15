package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

   private final UserRepository userRepository;

   private final RoleRepository roleRepository;


   public UserService(UserRepository userRepository, RoleRepository roleRepository) {
      this.userRepository = userRepository;
      this.roleRepository = roleRepository;

   }


   @Transactional
   public void saveUser(User user) throws Exception {
      user.setRoles(user.getRoles());
      user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
      userRepository.save(user);
   }


   @Transactional(readOnly = true)
   public List<User> listUsers() {
      return userRepository.findAll();
   }

   @Transactional(readOnly = true)
   public Optional<User> getUser(Long id) {
      return userRepository.findById(id);
   }
   @Transactional
   public void updateUser(User user) {
      user.setRoles(user.getRoles());
      userRepository.save(user);
   }

   @Transactional
   public void deleteUser(Long id) {
      userRepository.deleteById(id);
   }

   @Override
   @Transactional(readOnly = true)
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = findByUsername(username);
      if (user == null) {
         throw new UsernameNotFoundException("User not found");
      }
      return user;
   }

   @Transactional(readOnly = true)
   public User findByUsername(String username) {
      return userRepository.findByUsername(username);
   }

   @Transactional(readOnly = true)
   public List<Role> listRoles() {
      return roleRepository.findAll();
   }

   @Transactional
   public void saveRoles(Role role) {
      roleRepository.save(role);
   }
}
