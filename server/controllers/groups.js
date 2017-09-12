import { Group, User, Message } from '../models';
import { transporter, helperOptions } from '../config/nodemailer';

// Function to create new group
export const createGroup = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  let type = req.body.type;
  const createdBy = req.currentUser.username;
  if (!name) {
    return res.status(400).send({
      error: 'Group name is required.'
    });
  }
  if (!type || type.trim().toLowerCase() !== 'private') {
    type = 'public';
  }
  Group.create({
    name,
    description,
    createdBy,
    type
  })
  .then((group) => {
    User.findById(req.currentUser.id).then((user) => {
      group.addUser(user.id);
      return res.status(201).send({
        message: 'Group created',
        group
      });
    }).catch(err => res.status(400).send({
      error: err.errors[0].message
    }));
  })
  .catch(() => res.status(400));
};

// Function to add users to groups with username
export const addUserToGroup = (req, res) => {
  // Grab username from request body
  const username = req.body.username.trim().toLowerCase();
  // Grab groupId from request params
  const groupId = req.params.groupid;
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    // Find a user with that username from request body
    User.findOne({
      where: {
        username,
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'User does not exist with that username'
        });
      }
      group.getUsers({ where: { username } }).then((users) => {
        if (users.length > 0) {
          return res.status(400).send({
            error: `${user.username} already in group`
          });
        }
        group.addUser(user.id);
        // user.addGroup(group.id);

        res.status(201).send({
          message: `${user.username} added to group`
        });
      });
    }).catch(() => res.status(400));
  });
};

export const leaveGroup = (req, res) => {
  Group.findById(req.params.groupid).then((group) => {
    group.getUsers().then((users) => {
      if (users.length > 1) {
        group.removeUser(req.currentUser.id)
        .then(() => res.status(201).send({
          message: `${req.currentUser.username} has left the group`,
        }));
      } else {
        group.destroy().then(() => res.status(201).send({
          message: `${req.currentUser.username} left, and group deleted`
        }));
      }
    })
    .catch(err => res.status(400).send(err));
  }).catch(() => res.status(400).send({
    error: 'Error locating group with that id'
  }));
};

export const getGroupUsers = (req, res) => {
  const groupId = req.params.groupid;
  Group.findById(groupId).then((group) => {
    if (!group) {
      return res.status(404).send({
        error: 'Group does not exist'
      });
    }
    group.getUsers().then(users =>
      res.send({ group, users }));
  })
  .catch(err => res.status(400).send({
    error: err.errors[0].message
  }));
};

export const searchNonMembers = (req, res) => {
  const groupId = req.params.groupid;
  let { username } = req.query;
  const { offset, limit } = req.query;
  if (!username) {
    username = '';
  }
  const searchOptions = {
    where: {
      username: {
        $iLike: `%${username}%`
      }
    }
  };
  if (Number(offset) && typeof Number(offset) === 'number') {
    searchOptions.offset = Number(offset);
  }

  if (Number(limit) && typeof Number(limit) === 'number') {
    searchOptions.limit = Number(limit);
  }

  Group.findById(groupId).then((group) => {
    group.getUsers().then(groupUsers =>
      groupUsers.map(user => user.username)
    )
    .then((usernames) => {
      searchOptions.where.username.$notIn = usernames;
      User.findAndCountAll(searchOptions)
      .then(result => res.status(200).send({
        count: result.count,
        users: result.rows
      }));
    });
  })
  .catch(() => res.status(400).send({
    error: 'Failed to retrieve data. Invalid request'
  }));
};

export const sendMessageToGroup = (req, res) => {
  const content = req.body.content;
  let priority = req.body.priority;
  if (!content) {
    return res.status(400).send({
      error: 'Message must not be empty'
    });
  }
  if (!priority) {
    priority = 'normal';
  }
  priority = priority.trim().toLowerCase();
  Group.findById(req.params.groupid).then((group) => {
    if (!Message.verifyPriority(priority)) {
      return res.status(400).send({
        error: 'Incorrect priority option. Choose NORMAL, URGENT or CRITICAL.'
      });
    }
    Message.create({
      content,
      priority,
      sender: req.currentUser.username,
      readBy: req.currentUser.username
    }).then((message) => {
      message.setGroup(group.id);
      message.setUser(req.currentUser.id);
      console.log('heyyo!');
      const sender = message.sender.toUpperCase();
      console.log('sent by ', sender);
      // set email message parameters
      // filter out the email of sender
      const bcc = req.groupEmails.filter(email => email !== req.currentUser.email);
      const subject = `New ${message.priority} group message from ${sender}`;
      const html = `<div>
      <p>You have received a new ${message.priority} message from <strong>${sender}</strong> in your group <strong>'${group.name}'</strong></p>
      <div style="color:brown"><h3>${message.content.replace(/\n/gi, '<br/>')}</h3></div>
      <p>To reply ${sender}, please login to your account</p>
      </div>`;
      if (message.priority === 'urgent' || message.priority === 'critical') {
        transporter.sendMail(
          helperOptions('You', bcc, subject, html), (error, info) => {
            if (error) {
              return console.log({ error });
            }
            console.log('The message was sent', info);
          }
        );
      }
      res.status(201).send({ message });
    }).catch(err => res.status(400).send({
      // error: 'Failed to send the message'
      err
    }));
  }).catch(() => res.status(400));
};

export const getGroupMessages = (req, res) => {
  const groupId = req.params.groupid;
  const group = req.currentGroup;
  Message.findAll({
    where: {
      groupId
    }
  }).then(messages => res.status(200).send({ group, messages }))
    .catch(err => res.status(400).send(err));
};

export const markAsRead = (req, res) => {
  const user = req.currentUser;
  const messageId = req.params.messageid;
  Message.findById(messageId)
  .then((message) => {
    const readers = message.readBy.split(',');
    if (message && (user.username !== message.sender)
      && (readers.indexOf(user.username)) === -1) {
      message.update({
        readBy: `${message.readBy},${user.username}`
      })
      .then(update => res.status(201).send({ update }))
      .catch(err => res.status(400).send(err));
    } else {
      return res.status(201);
    }
  });
};

export const renameGroup = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.send({
      error: 'Group name required.'
    });
  }
  Group.findById(req.params.groupid).then((group) => {
    group.update({ name })
    .then(update => res.status(201).send({
      message: 'Group name succesfully changed',
      update
    })).catch((err) => {
      if (err.message) {
        return res.status(400).send({
          error: err.message
        });
      }
      return res.status(400).send({
        error: 'Error renaming group'
      });
    });
  });
};

export const changeGroupType = (req, res) => {
  if (!req.body.type) {
    return res.status(400).send({
      error: 'Group type required.'
    });
  }
  let type = req.body.type.trim().toLowerCase();
  if (type !== 'private') {
    type = 'public';
  }
  Group.findById(req.params.groupid).then((group) => {
    if (type === group.type) {
      return res.status(400).send({
        error: 'Group type same as current.'
      });
    }
    group.update({ type })
    .then(update => res.status(201).send({
      message: 'Group type succesfully changed',
      update
    })).catch((err) => {
      if (err.message) {
        return res.status(400).send({
          error: err.message
        });
      }
      return res.status(400).send({
        error: 'Error updating group type'
      });
    });
  });
};

export const changeGroupDescription = (req, res) => {
  const description = req.body.description;
  if (!description) {
    return res.send({
      error: 'Group description required'
    });
  } else if (description.length > 75) {
    return res.status(400).send({
      error: 'Group description should not be more than 75 characters'
    });
  }
  Group.findById(req.params.groupid).then((group) => {
    group.update({ description })
    .then(update => res.status(201).send({
      message: 'Group description succesfully updated',
      update
    })).catch((err) => {
      if (err.message) {
        return res.status(400).send({
          error: err.message
        });
      }
      return res.status(400).send({
        error: 'Error updating group description'
      });
    });
  });
};

export const deleteGroup = (req, res) => {
  Group.findById(req.params.groupid).then((group) => {
    if (req.currentUser.username !== group.createdBy) {
      return res.status(401).send({
        error: 'You can only delete groups created by you'
      });
    }
    group.destroy().then(() => res.status(201).send({
      message: 'Group successfully deleted'
    }))
    .catch(err => res.send(err));
  });
};
