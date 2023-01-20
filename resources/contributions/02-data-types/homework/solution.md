# A Solution

_Note: There could be many different solutions_

```javascript
var ratingsAllowed = ages.map(function(age) {
	return ratings.filter(function(rating, index) {
		return age >= ratingAges[index]
	})
})

ages.forEach(function(age, index) {
	console.log('Age ' + age + ' is allowed to see: ' + ratingsAllowed[index].toString())
})
```
