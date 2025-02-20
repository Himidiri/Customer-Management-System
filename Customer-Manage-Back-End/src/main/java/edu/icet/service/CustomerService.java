package edu.icet.service;

import edu.icet.dto.Customer;

import java.util.List;

public interface CustomerService {
    void addCustomer(Customer customer);

    List<Customer> getAll();

    void deleteCustomer(Integer id);

    void updateCustomer(Customer customer);
}
