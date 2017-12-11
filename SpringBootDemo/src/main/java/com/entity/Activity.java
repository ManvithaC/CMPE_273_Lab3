package com.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userActivity")
public class Activity {
    @Id
    public String id;

    public String username;
    public Integer uploadedFiles;
    public Integer sharedFiles;
    public Integer deletedFiles;

    public Activity(String username, Integer uploadedFiles, Integer sharedFiles, Integer deletedFiles ) {
        this.username = username;
        this.uploadedFiles = uploadedFiles;
        this.sharedFiles = sharedFiles;
        this.deletedFiles = deletedFiles;
    }
    public Integer getUploadedFiles() {
        return uploadedFiles;
    }

    public Integer getSharedFiles() {
        return sharedFiles;
    }

    public Integer getDeletedFiles() {
        return deletedFiles;
    }

}
