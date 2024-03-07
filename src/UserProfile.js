//Codice usato per indicare in sessione il nome utente
var UserProfile = (function() {
    var full_name = "";
    var Id = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getId = function() {
      return Id;    // Or pull this from cookie/localStorage
    };
  
    var setId = function(IdClient) {
      Id = IdClient;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName, 
      getId: getId,
      setId: setId
    }
  
  })();
  
  export default UserProfile;