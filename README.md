# Auctionary - Semester Project 2

Auctionary is a front-end application for an auction website where users can create listings for items to be bid on, and other users can place bids on these listings. The site provides an environment for buying and selling items, with credits as the primary currency.

## Project Overview

### Goal 

This project demonstrates skills from three semesters of front-end development, culminating in a responsive, interactive auction website. The focus is on user engagement through bidding, listing creation, and credit-based transactions.

### Key Features

- **User Registration:** New users receive 1000 credits upon joining, and only users with a ```stud.noroff.no``` email can register.
- **User Authentication:** Registered users can log in, update their profile, and log out.
- **Listing and Bidding:** Users can create item listings with titles, descriptions, images, and deadlines. They can also place bids on other users listings.
- **Credits System:** Credits are awarded for selling items and spent on purchasing items.
- **Search Functionality:** Non-registered users can search through listings but cannot place bids.

### Technical Requirements
- **API:** The application integrates with the Noroff Auction API to manage all backend operations.
- **CSS Framework:** Built with Bootstrap and custom SCSS for responsive design.
- **Static Hosting:** Hosted on Netlify for easy deployment and accessibility.
- **Design and Planning:** Prototype and design were created using Adobe XD, with project management on Trello.

## User Stories

1. A user with a stud.noroff.no email can register.
2. Registered users can log in, log out, and update their avatars.
3. Users can view their credits and create listings with media galleries.
4. Users can bid on other users' listings and view all bids on a listing.
5. Non-registered users can search through available listings.

## Project Setup

### Prerequisites
- **Node.js** (for local development)
- **Git** for cloning the repository

### Installation 
1. Clone the repository:
```bash
git clone https://github.com/ebejmo/social-media-client.git
```
2. Install dependencies:
```bash
npm install
```
3. Run the application locally:
```bas
npm run start
```
 
## Deployment

The project is hosted on Netlify for public access. To view the live demo, visit: LINK

## Special Instructions for Testers

1. Ensure the Noroff API is accessible and responding.
2. Use a stud.noroff.no email address for registration testing.
3. Note that only registered users can place bids.
