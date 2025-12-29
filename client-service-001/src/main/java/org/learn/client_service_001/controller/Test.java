package org.learn.client_service_001.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        System.out.println("Testing...");
        return ResponseEntity.ok("Testing...");
    }
}
