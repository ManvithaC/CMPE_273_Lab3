package com.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "filesList")
public class Fileslist {

    @Id
    public String id;

    public String username;
    public String filename;
    public String filepath;
    public String starred;
    public String createddate;
    public String modifieddate;
    public String type;
    public String Owner;
    public String access;

    public Fileslist(String username, String filename, String filepath, String starred, String createddate, String modifieddate, String type, String Owner ,String access) {
        this.username = username;
        this.filename = filename;
        this.filepath = filepath;
        this.starred = starred;
        this.createddate = createddate;
        this.modifieddate = modifieddate;
        this.type = type;
        this.Owner = Owner;
        this.access = access;
    }

    public String getFilepath() {
        return filepath;
    }
    public String getCreateddate() {
        return createddate;
    }
    public String getType() {
        return type;
    }
    public String getOwner() {
        return Owner;
    }
    public String getModifieddate() {
        return modifieddate;
    }
    public String getId() {
        return id;
    }
    public String getAccess() {
        return access;
    }
    public String getUsername() {
        return username;
    }
}
