// EMAILS BEING SENT OUT FOR SUPPORT TICKET STATUSES
const emailer = {
    openMail: {
        to: 'sammyad2018@gmail.com',
        from: 'forwardsup1247@gmail.com',
        subject: 'Ticket Has Been Created',
        text: 'Ticket has been created by Employee. Please address concern ASAP. Thank you',
        html: '<strong>Ticket has been created by Employee. Please address concern ASAP. Thank you</strong>',
    },
    inProgressMail: {
        to: '',
        from: 'forwardsup1247@gmail.com',
        subject: 'Your Ticket is in Progress',
        text: 'Your ticket is now in progress!!! We will update you as soon as a solution is found. -Forward Support',
        html: '<strong>Your ticket is now in progress!!! We will update you as soon as a solution is found. -Forward Support</strong>',
    },
    completeMail: {
        to: '',
        from: 'forwardsup1247@gmail.com',
        subject: 'Your Ticket Has Been Completed!',
        text: 'We have provide you with a solution to your problem! If your issue is resolved, please close your ticket. If it is not resolved, please contact us again. -Forward Support',
        html: '<strong>We have provide you with a solution to your problem. If your issue is resolved, please close your ticket. If it is not resolved, please contact us again. -Forward Support</strong>',
    }, 
    closeMail: {
        to: '',
        from: 'forwardsup1247@gmail.com',
        subject: 'Your Ticket is Now Closed',
        text: 'Your ticket has been closed. Thank you so much for contacting us. If any other issues arise, do not hesitate to contact us again. -Forward Support',
        html: '<strong>Your ticket has been closed. Thank you so much for contacting us. If any other issues arise, do not hesitate to contact us again. -Forward Support</strong>',
    }
};

module.exports = emailer;