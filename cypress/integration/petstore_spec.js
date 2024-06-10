/// <reference types="cypress" />

const apiBaseUrl = Cypress.env('baseUrl');
const apiKey = Cypress.env('apiKey');

describe('CypressPetStore', () => {
  const username = 'testuser';
  const userPayload = {
    id: 0,
    username: username,
    firstName: 'Test',
    lastName: 'User',
    email: 'fawaz@example.com',
    password: 'password',
    phone: '1234567890',
    userStatus: 1
  };

  it('Create User', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/user`,
      headers: {
        'api-key': apiKey
      },
      body: userPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User created successfully');
    });
  });

  it('Get User', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/user/${username}`,
      headers: {
        'api-key': apiKey
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(username);
      cy.log('User retrieved successfully');
    });
  });

  it('Update User', () => {
    const updatedUserPayload = {
      id: 0,
      username: username,
      firstName: 'UpdatedTest',
      lastName: 'UpdatedUser',
      email: 'fawz@example.com',
      password: 'newpassword',
      phone: '0987654321',
      userStatus: 1
    };

    cy.request({
      method: 'PUT',
      url: `${apiBaseUrl}/user/${username}`,
      headers: {
        'api-key': apiKey
      },
      body: updatedUserPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User updated successfully');
    });
  });

  it('Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiBaseUrl}/user/${username}`,
      headers: {
        'api-key': apiKey
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User deleted successfully');
    });
  });

  it('Login User', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/user/login`,
      headers: {
        'api-key': apiKey
      },
      qs: {
        username: username,
        password: 'password'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User logged in successfully');
    });
  });

  it('Logout User', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/user/logout`,
      headers: {
        'api-key': apiKey
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User logged out successfully');
    });
  });

  it('Find Pets by Status', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/pet/findByStatus`,
      headers: {
        'api-key': apiKey
      },
      qs: {
        status: 'available'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Pets retrieved successfully');
    });
  });

  it('Place an Order for a Pet', () => {
    const orderPayload = {
      id: 0,
      petId: 1,
      quantity: 1,
      shipDate: '2023-12-01T00:00:00.000+00:00',
      status: 'placed',
      complete: true
    };

    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/store/order`,
      headers: {
        'api-key': apiKey
      },
      body: orderPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Order placed successfully');
    });
  });

  it('Get Inventory', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/store/inventory`,
      headers: {
        'api-key': apiKey
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Inventory retrieved successfully');
    });
  });
});
