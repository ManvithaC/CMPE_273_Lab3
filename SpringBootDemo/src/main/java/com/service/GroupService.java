package com.service;
import com.entity.Group;
import com.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.DateFormat;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public Iterable<Group> getGroups(String username){

        return groupRepository.findByUsername(username);
    }

    public Iterable<Group> getMembers(String groupName){

        return groupRepository.findByGroupName(groupName);
    }

    public void delGroup(String groupName, String username){

        groupRepository.deleteByGroupNameAndUsername(groupName,username);
    }
    public Group createGroup(String groupName, String username){
        Date todaysDate = new Date();
        DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String createdDate = df2.format(todaysDate);
        return groupRepository.insert(new Group(username, groupName,"true" , username,createdDate ,"view" ));
    }
    public Group addMember(String memberName, String groupName, String username){
        Date todaysDate = new Date();
        DateFormat df2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String createdDate = df2.format(todaysDate);
        return groupRepository.insert(new Group(memberName, groupName,"false" , username,createdDate,"view" ));
    }
    public void deleteMember(String memberName, String groupName, String username){

        groupRepository.deleteByGroupNameAndUsername(groupName,memberName);
    }
}
