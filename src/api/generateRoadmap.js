import axios from 'axios';

export const generateRoadmap = async (formResponses) => {
  try {
    const response = await axios.post('http://localhost:5000/api/generate-roadmap', {
      formResponses,
    });
    console.log(formResponses)

    return response.data;
  } catch (error) {
    console.error("Error calling backend:", error);
    throw new Error("Failed to generate roadmap");
  }
};
  