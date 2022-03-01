Select 
customers.customer_id,
customers.name,
subjects.subjectname
from customers
JOIN subject student mapping
ON customers.customers_id=subject student mapping.customer_id
JOIN subjects
ON  subjects.subject_id  = subjects student mapping.subject_id;
order by subjects.subjectsname asc