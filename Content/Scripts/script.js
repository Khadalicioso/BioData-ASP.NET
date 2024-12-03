// Utility function to calculate age from birthdate
const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);

    // Validate date
    if (birth > today || isNaN(birth.getTime())) {
        return null;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

// Handle birthdate input changes
const birthdateInput = document.getElementById('birthdate');
const ageInput = document.getElementById('age');

if (birthdateInput && ageInput) {
    // Set max date to today
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    birthdateInput.setAttribute('max', maxDate);

    // Calculate age on input change
    birthdateInput.addEventListener('change', (event) => {
        const age = calculateAge(event.target.value);
        
        if (age === null) {
            ageInput.value = '';
            birthdateInput.value = '';
            alert('Please enter a valid birthdate');
            return;
        }

        if (age < 0) {
            ageInput.value = '';
            birthdateInput.value = '';
            alert('Birthdate cannot be in the future');
            return;
        }

        if (age > 150) {
            ageInput.value = '';
            birthdateInput.value = '';
            alert('Please enter a valid birthdate');
            return;
        }

        ageInput.value = age;
    });

    // Clear age when birthdate is cleared
    birthdateInput.addEventListener('input', (event) => {
        if (!event.target.value) {
            ageInput.value = '';
        }
    });
}