package com.service;
import com.entity.Activity;
import com.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getActivity(String username){

        return activityRepository.findByUsername(username);
    }
    public Activity SignupActivity( String username){

        return activityRepository.insert(new Activity(username,0,0,0 ));
    }
}
