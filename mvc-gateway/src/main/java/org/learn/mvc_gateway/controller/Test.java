package org.learn.mvc_gateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @PostMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("Test");
    }
}
