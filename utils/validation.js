/**
 * Input validation utility
 */
class Validation {
  /**
   * Validates an email address format
   * @param {string} email - The email to validate
   * @returns {boolean} - Whether the email is valid
   */
  static isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Checks if string is empty after trimming
   * @param {string} str - The string to validate 
   * @returns {boolean} - Whether the string is non-empty
   */
  static isNonEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0;
  }

  /**
   * Validates a date string
   * @param {string} dateStr - The date string to validate
   * @returns {boolean} - Whether the date is valid
   */
  static isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

  /**
   * Validates if required fields are present and non-empty in an object
   * @param {Object} obj - The object with fields to validate
   * @param {Array<string>} fields - The required field names
   * @returns {Object} - {isValid: boolean, missingFields: Array<string>}
   */
  static validateRequiredFields(obj, fields) {
    const missingFields = [];
    
    for (const field of fields) {
      if (!obj[field] || (typeof obj[field] === 'string' && !obj[field].trim())) {
        missingFields.push(field);
      }
    }
    
    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }
}

module.exports = Validation;
