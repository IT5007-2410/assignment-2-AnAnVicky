/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', idNumber: 'S1234567D', phone: 88885555, orderId: 202409301234567,
    travelDate: new Date('2024-10-15'), bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', idNumber: 'S7654321D', phone: 88886666, orderId: 202409301234568,
    travelDate: new Date('2024-10-06'), bookingTime: new Date(),
  },
  {
    id: 3, name: 'Jane', idNumber: 'S0987654D', phone: 88876666, orderId: 202409301234566,
    travelDate: new Date('2024-10-10'), bookingTime: new Date(),
  },
  {
    id: 4, name: 'Tom', idNumber: 'S6574893D', phone: 87886436, orderId: 202409301234560,
    travelDate: new Date('2024-10-20'), bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  const { traveller } = props;
  return (
    <tr>
	    <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.idNumber}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.orderId}</td>
      <td>{traveller.travelDate.toLocaleDateString()}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>ID Number</th>
          <th>Phone</th>
          <th>Order ID</th>
          <th>Travel Date</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = { 
      successMessage: '', 
      errorMessage: '' // reminder message
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
      const form = document.forms.addTraveller;
      const idNumber = form.travelleridnumber.value.trim();
      const phone = form.phone.value.trim(); 

      //id number must be 9 characters long
      const idNumberRegex = /^[A-Za-z]\d{7}[A-Za-z]$/;
      if (!idNumberRegex.test(idNumber)) {
        this.setState({ errorMessage: 'Invalid ID Number. It must be 9 characters long.' });
        return;
      }

      //phone number must be 8 digits long
      const phoneRegex = /^\d{8}$/;
      if (!phoneRegex.test(phone)) {
        this.setState({ errorMessage: 'Invalid Phone Number. It must be 8 digits long.' });
        return;
      }

      //if the ID number and phone number are valid, clear the error message
      this.setState({ errorMessage: '' });

      const newTraveller = {
      name: form.travellername.value,
      idNumber: form.travelleridnumber.value, // add the ID number to the new traveller
      phone: form.phone.value,
      orderId: Math.floor(Math.random() * 1000000000000000), // generate a random order ID for the new traveller
      travelDate: new Date(form.travelDate.value),
      bookingTime: new Date(),
    };
    
    this.props.bookTraveller(newTraveller); // call the bookTraveller() function in the parent component
    
    // clear the form fields
    form.travellername.value = '';
    form.travelleridnumber.value = '';
    form.phone.value = '';
    form.travelDate.value = '';

    // display a success message
    this.setState({ successMessage: 'Traveller added successfully!' });

    // hide the success message after 2 seconds
    setTimeout(() => {
      this.setState({ successMessage: '' });
    }, 2000);
  }


  render() {
    return (
      <div>
        <form name="addTraveller" onSubmit={this.handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            name="travellername" 
            placeholder="Name" 
            required 
            style={{ margin: '5px', padding: '10px', width: '250px', fontSize: '16px' }} 
          />
          <input 
            type="text" 
            name="travelleridnumber" 
            placeholder="ID Number (e.g., S1234567D)" 
            required 
            style={{ margin: '5px', padding: '10px', width: '250px', fontSize: '16px' }} 
          />
          <input 
            type="text" 
            name="phone" 
            placeholder="Phone (8 digits)" 
            required 
            style={{ margin: '5px', padding: '10px', width: '250px', fontSize: '16px' }} 
          />
          <input 
            type="date" 
            name="travelDate" 
            required 
            style={{ margin: '5px', padding: '10px', width: '250px', fontSize: '16px' }} 
          />
          <button 
            type="submit" 
            style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Add
          </button>
        </form>
        {this.state.errorMessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '18px' }}>{this.state.errorMessage}</p>}
        {this.state.successMessage && <p style={{ color: 'green', textAlign: 'center', fontSize: '18px' }}>{this.state.successMessage}</p>}
      </div>
    );
  }
}



class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.deleteTraveller;
    const idNumberToDelete = form.idNumber.value.trim(); //according to the ID number, delete the passenger,because ID number is unique
    this.props.deleteTraveller(idNumberToDelete);//Q5. Call the deleteTraveller() function in the parent component
    form.travellername.value = ''; 
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <input 
          type="text" 
          name="idNumber" 
          placeholder="Enter ID Number" 
          required 
          style={{ margin: '5px', padding: '10px', width: '300px', fontSize: '16px' }} 
        />
        <button 
          type="submit" 
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Delete
        </button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const totalSeats = 10;
    const bookedSeats = this.props.travellers.length; //seat booked
    const availableSeats = totalSeats - bookedSeats; //seat available

    //create an array of seats, with the first few seats occupied and the rest available
    const seats = Array.from({ length: totalSeats }, (_, index) => index < bookedSeats ? 'occupied' : 'available');
	return (
    <div>
    <h2>Seat Availability</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '220px', 
      margin: '0 auto'
    }}>
      {seats.map((status, index) => (
        <button
          key={index}
          style={{
            width: '40px',
            height: '40px',
            margin: '5px',
            backgroundColor: status === 'occupied' ? 'gray' : 'green', //according to the status, set the background color
            border: '1px solid #000',
            borderRadius: '5px',
            cursor: 'default'
          }}
          disabled // disable the button
        >
        </button>
      ))}
    </div>
    <p style={{ textAlign: 'center', marginTop: '10px' }}>
      {availableSeats} seats available out of {totalSeats}
    </p>
  </div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: initialTravellers, nextId: 5, selector: 'home' }; //initialize the state variable
    this.bookTraveller = this.bookTraveller.bind(this); //bind the bookTraveller() function
    this.deleteTraveller = this.deleteTraveller.bind(this);  //bind the deleteTraveller() function
    this.setSelector = this.setSelector.bind(this);  //bind the setSelector() function
  }

  setSelector(value)
  {
        this.setState({selector: value});  	
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(newTraveller) {
    const totalSeats = 10; //total number of seats
    const bookedSeats = this.state.travellers.length;
  
    // if still have available seats
    if (bookedSeats >= totalSeats) {
      alert("No available seats!");
      return;
    }
	    // update the state variable with the new passenger
      newTraveller.id = this.state.nextId; // assign the next ID to the new traveller
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, newTraveller],
        nextId: prevState.nextId + 1, //upoad the next ID
        selector: 'displayTraveller'
      }));
  }

  deleteTraveller(idNumber) {
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(traveller => traveller.idNumber !== idNumber)  // delete the passenger with the specified ID number
    }),() => {
      // after deleting the passenger, display the updated list of passengers
      this.setSelector('displayTraveller');
    });
  }

  render() {
    return (//design navbar format and buttons with onClick event
      <div> 
        <h1>Ticket To Ride</h1>  
        <div style={{    
          display: 'flex',       
          justifyContent: 'space-around',  
          backgroundColor: 'yellow', 
          padding: '10px', 
          borderRadius: '8px'
        }}>
          <button 
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => this.setSelector('home')}>Home</button>
          <button 
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => this.setSelector('addTraveller')}>Add Traveller</button>
          <button 
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => this.setSelector('displayTraveller')}>Display Travellers</button>
          <button 
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => this.setSelector('deleteTraveller')}>Delete Traveller</button>
            </div>
            <div className="content">
              {this.state.selector === 'home' && <Homepage travellers={this.state.travellers} />}   
              {this.state.selector === 'addTraveller' && <Add bookTraveller={this.bookTraveller} />}
              {this.state.selector === 'displayTraveller' && <Display travellers={this.state.travellers} />}
              {this.state.selector === 'deleteTraveller' && <Delete deleteTraveller={this.deleteTraveller} />}
            </div>
	  </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));