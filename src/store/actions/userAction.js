import axios from "../../utils/axiosConfig"
import { saveFormData, markVideoWatched, markQuizCompleted} from "../PlayerSlice";

export const asyncUserPersonalInfo = (user) => async (dispatch, getState) => {
  try {
    // First, check if a user with the same email already exists
    const existingUsersRes = await axios.get(`/users?formData.email=${user.email}`);
    const existingUsers = existingUsersRes.data;

    // Check if a user with the same email and name already exists
    const duplicateUser = existingUsers.find(u => 
      u.formData.email === user.email && 
      u.formData.name === user.name
    );

    if (duplicateUser) {
      console.log("User already exists:", duplicateUser);
      // If user already exists, update the existing record instead of creating a new one
      const updatedUser = {
        ...duplicateUser,
        formData: {
          ...duplicateUser.formData,
          ...user
        }
      };

      const updateRes = await axios.put(`/users/${duplicateUser.id}`, updatedUser);
      
      if (updateRes.status >= 200 && updateRes.status < 300) {
        console.log("User updated successfully:", updateRes.data);
        // Save only the formData part to Redux
        dispatch(saveFormData(updateRes.data.formData));
        return updateRes.data;
      }
    } else {
      // User doesn't exist, create a new entry
      // The user object is the actual form data
      // We need to wrap it in the proper structure for the database
      const newUser = {
        id: user.id || Date.now().toString(), // Generate ID if not present
        formData: user, 
        formFilled: true,
        videoWatched: false,
        quizCompleted: false
      };

      const res = await axios.post("/users", newUser);

      if (res.status >= 200 && res.status < 300) {
        console.log("User successfully added:", res.data);
        // Save only the formData part to Redux (not the entire user object)
        dispatch(saveFormData(res.data.formData)); 
        return res.data;
      } else {
        console.error("Unexpected response:", res);
      }
    }
  } catch (error) {
    console.error("Error processing user:", error);
  }
};

export const asyncUserVideoWatched = (userId) => async (dispatch, getState) => {
  try {
    console.log("Updating videoWatched for user ID:", userId);
    
    // First, try to get the user to verify it exists
    try {
      const userRes = await axios.get(`/users/${userId}`);
      console.log("Found user:", userRes.data);
    } catch (userError) {
      console.log("User not found with ID, trying to find by formData.id");
      
      // If not found by ID, try to find user by formData.id
      try {
        const allUsersRes = await axios.get(`/users`);
        const allUsers = allUsersRes.data;
        const user = allUsers.find(u => u.formData.id === userId);
        
        if (user) {
          // Update with the correct user ID
          userId = user.id;
          console.log("Found user by formData.id, using ID:", userId);
        } else {
          throw new Error("User not found by formData.id either");
        }
      } catch (findAllError) {
        console.error("Could not find user by any method:", findAllError);
        // Dispatch Redux action anyway to update UI
        dispatch(markVideoWatched());
        return;
      }
    }

    // Find the user by ID and update videoWatched status
    const res = await axios.patch(`/users/${userId}`, {
      videoWatched: true
    });

    if (res.status >= 200 && res.status < 300) {
      console.log("Video watched updated successfully:", res.data);
      // Update Redux state
      dispatch(markVideoWatched());
    } else {
      console.error("Unexpected response while updating:", res);
    }

  } catch (error) {
    console.error("Error updating videoWatched:", error);
    // Even if API fails, update Redux state to maintain UI consistency
    dispatch(markVideoWatched());
  }
};

export const asyncUserQuizWatched = (userId) => async (dispatch, getState) => {
  try {
    console.log("Updating quizCompleted for user ID:", userId);
    
    // First, try to get the user to verify it exists
    try {
      const userRes = await axios.get(`/users/${userId}`);
      console.log("Found user:", userRes.data);
    } catch (userError) {
      console.log("User not found with ID, trying to find by formData.id");
      
      // If not found by ID, try to find user by formData.id
      try {
        const allUsersRes = await axios.get(`/users`);
        const allUsers = allUsersRes.data;
        const user = allUsers.find(u => u.formData.id === userId);
        
        if (user) {
          // Update with the correct user ID
          userId = user.id;
          console.log("Found user by formData.id, using ID:", userId);
        } else {
          throw new Error("User not found by formData.id either");
        }
      } catch (findAllError) {
        console.error("Could not find user by any method:", findAllError);
        // Dispatch Redux action anyway to update UI
        dispatch(markQuizCompleted());
        return;
      }
    }

    // Find the user by ID and update quizCompleted status
    const res = await axios.patch(`/users/${userId}`, {
      quizCompleted: true
    });

    if (res.status >= 200 && res.status < 300) {
      console.log("Quiz completed updated successfully:", res.data);
      // Update Redux state
      dispatch(markQuizCompleted());
    } else {
      console.error("Unexpected response while updating quizCompleted:", res);
    }

  } catch (error) {
    console.error("Error updating quizCompleted:", error);
    // Even if API fails, update Redux state to maintain UI consistency
    dispatch(markQuizCompleted());
  }
};

export const asyncUserLogin = (data) => async (dispatch) => {
  try {
    // Fetch user by email from db.json
    const res = await axios.get(`/users?formData.email=${data.email}`);
    const users = res.data;

    if (users.length > 0) {
      // Match username & email
      const user = users.find(
        (u) =>
          u.formData.name === data.username &&
          u.formData.email === data.email
      );

      if (user) {
        console.log("✅ Login successful:", user);
        // Save only the formData part to Redux (not the entire user object)
        dispatch(saveFormData(user.formData));
        return { success: true, user: user.formData };
      } else {
        return { success: false, message: "Invalid username or email." };
      }
    } else {
      return { success: false, message: "User not found. Please sign up first." };
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};