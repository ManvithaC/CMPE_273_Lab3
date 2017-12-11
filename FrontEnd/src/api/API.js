const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/customer/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });
  export const getFiles = (payload) =>
            fetch(`${api}/files/getFiles/`,{
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload),
              credentials: 'include'
            })
                .then(res => res.json())
                .catch(error => {
                    console.log("getFiles - This is error.");
                    return error;
                });
export const welcome = () =>
      fetch(`${api}/users/welcome`, {
          method: 'POST',
          // headers: {
          //     ...headers,
          //     'Content-Type': 'application/json'
          // },
          credentials:'include',
          //body: JSON.stringify(payload)
      }).then(res => {
          return res.status;
      })
          //console.log(res);
          //return res.status;
          //res.data;
      //})
          .catch(error => {
              console.log("welcome - This is error");
              return error;
          });

export const favoriteFile = (payload) =>
    //console.log("API file" + payload.toString());
    fetch(`${api}/files/starFile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res.status;
    })
    .catch(error => {
        console.log("favoriteFile- This is error");
        return error;
    });
export const unFavoriteFile = (payload) =>
    //console.log("API file" + payload.toString());
    fetch(`${api}/files/unstarFile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res.status;
    })
    .catch(error => {
        console.log("unFavoriteFile - This is error");
        return error;
    });

export const doSignUp = (payload) =>
            fetch(`${api}/customer/add`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials:'include'
            }).then(res => {
                return res.status;
            })
                .catch(error => {
                    console.log("doSignUp - This is error");
                    return error;
                });

export const getUserActivity = () =>
        //console.log("API_Payload:" + payload);
        fetch(`${api}/user/getActivity`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include'
        }).then(res => res.json())
        .catch(error => {
            console.log("getUserActivity - This is error");
            return error;
        });

export const getAbout = (payload) =>
        //console.log("API_Payload:" + payload);
        fetch(`${api}/about/getDetails`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => res.json())
        .catch(error => {
            console.log("getAbout - This is error");
            return error;
        });

export const AboutSubmit = (payload) =>
        fetch(`${api}/about/submitDetails`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        })
            .catch(error => {
                console.log("AboutSubmit - This is error");
                return error;
            });
export const createGroup = (payload) =>
        fetch(`${api}/group/createGroup`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        })
            .catch(error => {
                console.log("createGroup - This is error");
                return error;
            });
export const deleteGroup = (payload) =>
        fetch(`${api}/group/delGroup`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        })
            .catch(error => {
                console.log("deleteGroup - This is error");
                return error;
            });
export const addMember = (payload) =>
        fetch(`${api}/group/addMember`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        })
            .catch(error => {
                console.log("addMember - This is error");
                return error;
            });
export const deleteMember = (payload) =>
        fetch(`${api}/group/deleteMember`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        })
            .catch(error => {
                console.log("deleteMember - This is error");
                return error;
            });
export const getMemberDetails = (payload) =>
          fetch(`${api}/group/getMembers/`,{
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
          })
              .then(res => res.json())
              .catch(error => {
                  console.log("getFiles - This is error.");
                  return error;
              });
export const getGroups = () =>
        fetch(`${api}/group/getGroups`, {
            method: 'GET',
            credentials:'include'
        }).then(res => res.json())
            .catch(error => {
                console.log("getGroups - This is error");
                return error;
            });
            // export const getGroups = (payload) =>
            //         fetch(`${api}/group/getGroups/`, {
            //             method: 'POST',
            //             headers: {
            //                 ...headers,
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(payload),
            //             credentials:'include'
            //         }).then(res => res.json())
            //             .catch(error => {
            //                 console.log("getGroups - This is error");
            //                 return error;
            //             });
export const getRecentFiles = (payload) =>
          fetch(`${api}/users/getrecentfiles/`,{
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
          })
              .then(res => res.json())
              .catch(error => {
                  console.log("getRecentFiles - This is error.");
                  return error;
              });

export const uploadFile = (payload) =>
          fetch(`${api}/upload/all`, {
              method: 'POST',
              body: payload,
              headers: {
                  ...headers,
              },
              credentials:'include'
          }).then(res => {
              return res.status;
          }).catch(error => {
                  console.log("uploadFile - This is error");
                  return error;
              });

export const shareFile = (payload) =>
          fetch(`${api}/files/shareFile`, {
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload),
              credentials:'include'
          }).then(res => {
              return res.status;
          }).catch(error => {
                  console.log("ShareFile - This is error");
                  return error;
              });

export const shareFileToGroup = (payload) =>
        fetch(`${api}/users/shareFile`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => {
            return res.status;
        }).catch(error => {
                console.log("shareFileToGroup - This is error");
                return error;
            });


export const createFolder = (payload) =>
          fetch(`${api}/files/createFolder`, {
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload),
              credentials:'include'
          }).then(res => {
              return res.status;
          }).catch(error => {
                  console.log("createFolder - This is error");
                  return error;
              });

export const listDir = (payload) =>
        fetch(`${api}/users/listDir/`,{
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => {
                console.log("listDir - This is error.");
                return error;
            });

export const download = (payload) =>
        fetch(`${api}/users/download/`,{
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        })
        .then(function(response) {
              console.log("response: "+response);
                return response;

        }).catch(error => {
                console.log("download - This is error");
                //console.log(error);
                return error;
            });
export const deleteFile = (payload) =>
          fetch(`${api}/files/deleteFile`, {
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload),
              credentials:'include'
          }).then(res => {
              return res.status;
          }).catch(error => {
                  console.log("deleteFile - This is error");
                  return error;
              });

export const logout = () =>
    fetch(`${api}/customer/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("logout - This is error");
            return error;
        });
