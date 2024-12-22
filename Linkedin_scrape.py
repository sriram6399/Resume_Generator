from linkedin_api import Linkedin

# Authenticate using any Linkedin user account credentials
api = Linkedin('guttikondasriram007@gmail.com','NITDece@6399')

search_results = api.search_jobs(keywords="SDE1",limit=5)

for job in search_results:
    url = job['trackingUrn']
    job_id = url.split(':')[-1]
    print(api.get_job(job_id)['description']['text'])
    break