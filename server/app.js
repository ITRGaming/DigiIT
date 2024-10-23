const mongoose = require('mongoose');

mongoose
  .connect(`mongodb+srv://raghavbhutra:Raghav88@cluster0.q09qe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('Database connected!!')
  })
  .catch(err => {
    console.error('Failed to connect to database', err)
  })

const SimSchema = new mongoose.Schema({
    sim_number: {
        type: Number,
        required: true,
        unique: true,
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
    activation_date: {
        type: Date,
    },
});
const User = mongoose.model('users', SimSchema);
User.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
    resp.send('App is Working');
});

app.post("/activate", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        console.log(result);
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.put("/deactivate/:sim_number", async (req, res) => {
    try {
        const sim_number = req.params.sim_number;
        console.log(sim_number);
        const updatedData = req.body;
        console.log(req.body);
        const result = await User.updateOne({ sim_number: sim_number }, { $set: updatedData });
        console.log(result);
        res.send(result);

    } catch (e) {
        res.send("Something Went Wrong");
    }
});
app.put("/reactivate/:sim_number", async (req, res) => {
    try {
        const sim_number = req.params.sim_number;
        console.log(sim_number);
        const updatedData = req.body;
        console.log(req.body);
        const result = await User.updateOne({ sim_number: sim_number }, { $set: updatedData });
        console.log(result);
        res.send(result);

    } catch (e) {
        res.send("Something Went Wrong");
    }
});
app.get('/sim-details/:sim_number', async (req, res) => {
    try {
        const sim_number = req.params.sim_number; // Get sim_number from params
        console.log(sim_number);
        const user = await User.findOne({ sim_number: sim_number }); // Use findOne instead of findById
        if (!user) {
            return res.status(404).send('SIM not found');
        }
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching SIM details');
      }
  });

app.listen(5000);