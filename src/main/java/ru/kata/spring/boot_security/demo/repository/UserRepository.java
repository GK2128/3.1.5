package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   @Query("select u from User u JOIN FETCH u.roles where u.email = :username")
   User findByUsername(String username);
}
