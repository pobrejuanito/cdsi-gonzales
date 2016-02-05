import pdb
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template.context_processors import csrf
from django.core.mail import send_mail
from validate_email import validate_email

# Create your views here.
def index(request):

    page_data = {}
    if request.method == 'POST':
        message = 'Appointment Request' + "\n"
        message += 'Name: ' + request.POST.get('name') + "\n"
        message += 'Phone: ' + request.POST.get('phone') + "\n"
        message += 'Email: ' + request.POST.get('email') + "\n"
        message += 'Time: ' + request.POST.get('time') + "\n"
        message += 'Message: ' + request.POST.get('message') + "\n\n"
        message += "Sincerely, Gonzales Dental Messenger"
        send_mail('An appointment message from Gonzales Dental Care Website', message, email, ['pobrejuanito@gmail.com'], fail_silently=False)
        pdb.set_trace()
        return JsonResponse({'key_values': request.POST.get('name')})

    page_data.update(csrf(request))
    return render_to_response('home.html', page_data)

def handler404(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('500.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response
