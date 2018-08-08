# Forward Support - A Service Ticket System

Forward Support is a internal support ticketing system. The core concept is a simple application that can quickly manage employee technical issues.  The system is divided into two types of users. Admins and Users. Once you create an account, the admin is able to assign the user a role within the above stated perimeters.  

### Submitting Tickets
Users submit a ticket via the main page. From a drop down menu they can choose the area in which they are having trouble. These are divided as follows:

* Software
* Network
* Hardware

The user will add a brief description of the issue. An email confirmation will be sent out to them, with the ticket status. 

The status of a ticket will be listed as follows:

* Open
* In Progress
* Complete
* Closed

Each status change generates an email with a notation of the current status change.

ONLY the Admin user can update, change a status, or assign a ticket to a department.

The Admin role will see all the current tickets that are currently live and what the actual status is. The Admin will see the following:

* User who submitted ticket
* Type of issue
* Status
* What department the ticket has be assigned to.

Once the issue is resolved to the users satisfaction, the Admin will update the status to closed and remove it from the open ticket list. The user will be able to see a history of prior tickets from their account page.
