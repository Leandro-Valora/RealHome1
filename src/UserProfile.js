//Codice usato per indicare in sessione il nome utente
var UserProfile = (function() {
    var full_name = "";
    var typeU = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getType = function() {
      return typeU;    // Or pull this from cookie/localStorage
    };
  
    var setType = function(typeClient) {
      typeU = typeClient;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName, 
      getType: getType,
      setType: setType
    }
  
  })();
  
  export default UserProfile;