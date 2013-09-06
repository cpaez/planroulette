// Class to represent a plan on the grid
function Plan(item) {
    var self = this;

    this.name = ko.observable(item.name);
    this.description = ko.observable(item.description);
}

// Overall viewmodel for this screen, along with initial state
function PlanViewModel() {
    var self = this;
    self.plans = ko.observableArray();

	$.blockUI({ message: '<br/><h3>Please wait, the best plans are loading ...</h3>' });

    //$.getJSON('http://localhost:3000/plans?callback=?',function  (data) {
    //    console.log(data) ;
    //});

     window.setTimeout(function() {
        $.ajax({
         url: "http://localhost:3000/plans?callback=?", 
         dataType: "jsonp",
         success: function(allData) {
                     var mappedPlans = $.map(allData, function(item) { return new Plan(item) });
                     self.plans(mappedPlans);
                     console.log(self.plans());
                     $.unblockUI();
                 }, 
         error: function(request, status, error) {
                     console.log(request.status);
                 }
         });
    }, 600);

    // Operations
    self.addPlan = function() {
        self.plans.push(new Plan("Planazo", "Planazo de aquellos!"));
    }
    self.removePlan = function(plan) { self.plans.remove(plan)}
}