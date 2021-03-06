import pdb
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template.context_processors import csrf
from django.core.mail import send_mail
from validate_email import validate_email
from django.conf import settings
from capcha import CaptchaContactForm
from capcha import CaptchaAppointmentForm
from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url

# Create your views here.
def index(request):

   page_data = {}
   contactForm = CaptchaContactForm()
   appointmentForm = CaptchaAppointmentForm(request.POST)
   page_data = {'form': appointmentForm, 'contactForm': contactForm}
   page_data.update(csrf(request))
   return render_to_response('home.html', page_data)

def bookingform(request):

   if request.method == 'POST':
      form = CaptchaAppointmentForm(request.POST)
      if form.is_valid():
         message = 'Good day!' + "\n"
         message += 'A new lead was generated from website with appointment request form:' + "\n\n"
         message += 'Name: ' + request.POST.get('name') + "\n"
         message += 'Phone: ' + request.POST.get('phone') + "\n"
         message += 'Email: ' + request.POST.get('email') + "\n"
         message += 'Time: ' + request.POST.get('time') + "\n"
         message += 'Message: ' + request.POST.get('message') + "\n\n"
         message += settings.EMAIL_SIGNATURE
         send_mail(settings.EMAIL_APPOINTMENT_SUBJECT, message,  settings.EMAIL_TO, [settings.EMAIL_TO], fail_silently=False)

         to_json_response = dict()
         to_json_response['status'] = 1
      else:
         to_json_response = dict()
         to_json_response['status'] = 0
         to_json_response['form_errors'] = form.errors
         to_json_response['new_cptch_key'] = CaptchaStore.generate_key()
         to_json_response['new_cptch_image'] = captcha_image_url(to_json_response['new_cptch_key'])

      return JsonResponse(to_json_response)
   else:
      return JsonResponse({})

def sendmessage(request):

   if request.method == 'POST':
      # create a form instance and populate it with data from the request:
      form = CaptchaContactForm(request.POST)
      if form.is_valid():
         message = 'Good day!' + "\n"
         message += 'A new lead was generated from website with contact form:' + "\n\n"
         message += 'Name: ' + request.POST.get('fullname') + "\n"
         message += 'Phone: ' + request.POST.get('phone') + "\n"
         message += 'Email: ' + request.POST.get('email') + "\n"
         message += 'Message: ' + request.POST.get('message') + "\n\n"
         message += settings.EMAIL_SIGNATURE
         send_mail(settings.EMAIL_CONTACTUS_SUBJECT, message,  settings.EMAIL_TO, [settings.EMAIL_TO], fail_silently=False)
         to_json_response = dict()
         to_json_response['status'] = 1
      else:
         to_json_response = dict()
         to_json_response['status'] = 0
         to_json_response['form_errors'] = form.errors
         to_json_response['new_cptch_key'] = CaptchaStore.generate_key()
         to_json_response['new_cptch_image'] = captcha_image_url(to_json_response['new_cptch_key'])

      return JsonResponse(to_json_response)
   else:
      return JsonResponse({})

def bootstrapmodal(request):
   page_data = {}
   return render_to_response('boostrap-parent-modal.html', page_data)

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
