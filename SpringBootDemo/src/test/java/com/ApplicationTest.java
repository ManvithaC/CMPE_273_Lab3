package com;

import com.controller.AboutController;
import com.entity.Customer;
import com.repository.CustomerRepository;
import com.service.CustomerService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationTest {
    @Autowired
    private AboutController aboutController;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerService customerService;


    @Test
    public void controllerTest() throws Exception {
        assertThat(aboutController).isNotNull();
    }
    @Test
    public void shouldReturnAllTheUsers() throws Exception {
        this.mockMvc.perform(post("/customer/all")).andExpect(status().isOk());
    }
    @Test
    public void shouldReturnAllTheGroups() throws Exception {
        this.mockMvc.perform(get("/group/getGroups")).andExpect(status().isOk());
    }

    @Test
    public void shouldloginWithValidCredentials() throws Exception {

        Customer u=new Customer();
        List<Customer> user1=new ArrayList<Customer>();
        user1.add(u);

        Mockito.when(
                customerService.login("user2@g.com","user2")).thenReturn(user1);

        String json = "{\n" +
                "  \"username\": \"user2@g.com\",\n" +
                "  \"password\": \"user2\"\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
    }
    @Test
    public void shouldNotloginWithoutValidCredentials() throws Exception {

        Customer u=new Customer();
        List<Customer> user1=new ArrayList<Customer>();
        user1.add(u);

        Mockito.when(
                customerService.login("user2@g.com","user2")).thenReturn(user1);

        String json = "{\n" +
                "  \"username\": \"user3@g.com\",\n" +
                "  \"password\": \"user3\"\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isNotFound());
    }

    @Test
    public void shouldReturnActivity() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        mockMvc.perform(MockMvcRequestBuilders.post("/user/getActivity").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldReturnAllTheFilesWithSession() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        mockMvc.perform(MockMvcRequestBuilders.post("/files/getFiles").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void shouldReturnAllTheGroupsWithSession() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        mockMvc.perform(MockMvcRequestBuilders.get("/group/getGroups").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    public void shouldReturnMembersOfGroup() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"groupName\": \"Group1\",\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/group/getMembers").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

    }
    @Test
    public void shouldAddMemberToGroup() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"groupName\": \"Group1\",\n" +
                "  \"memberName\": \"user3@gmail.com\"\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/group/addMember").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());

    }
    @Test
    public void shouldDeleteMemberFromGroup() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"groupName\": \"Group1\",\n" +
                "  \"memberName\": \"user3@gmail.com\"\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/group/deleteMember").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());

    }
    @Test
    public void shouldCreateGroup() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"groupName\": \"Group_Test\",\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/group/createGroup").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());

    }
    @Test
    public void shouldDeleteGroup() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"groupName\": \"Group_Test\",\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/group/delGroup").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

    }
    @Test
    public void shouldStarFile() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"fileName\": \"004.jpg\",\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/files/starFile").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

    }
    @Test
    public void shouldUnStarFile() throws Exception {

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("name", "user2@g.com");

        String json = "{\n" +
                "  \"fileName\": \"004.jpg\",\n" +
                "}";

        mockMvc.perform(MockMvcRequestBuilders.post("/files/unstarFile").sessionAttrs(sessionattr).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

    }

}
