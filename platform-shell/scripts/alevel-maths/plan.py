from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[2]
scope=json.loads((ROOT/'output/edexcel-9ma0-scope/scope.json').read_text())
# A plan selects narrowly defined activities, never a tool's unrestricted mixed mode.
GEN={}
def g(id,tool,*items):GEN[id]={'tool':tool,'activities':[[lev,t] for lev,types in items for t in types.split(',')]}
g('P2.2','surds-radicals',(3,'rationalize_simple,rationalize_binomial,expand_surds,difference_squares'))
g('P2.4','conic-intersections',(2,'parabola_line_vertical,parabola_line_horizontal,parabola_line_general'))
g('P2.6a','remainder-theorem',(1,'syn_cubic_exact,syn_cubic_rem'),(3,'factor_solve,factor_find_k'))
g('P2.6b','algebraic-fractions',(1,'simplify_factorise'),(2,'multiply_fractions,divide_fractions'),(3,'add_different_denominators'))
g('P2.7a','graph-transformations-curve-sketching',(4,'quadratic_features,reciprocal_asymptotes,cubic_roots'))
g('P2.9','graph-transformations-curve-sketching',(3,'combined_from_equation,describe_transformation,transform_key_points'))
g('P2.10','partial-fractions',(1,'distinct_linear'),(2,'repeated_linear,repeated_linear_coefficients'))
g('P3.1','straight-lines',(3,'equation_two_points,equation_point_gradient'),(4,'intersection_point,parallel_perpendicular'))
g('P3.2a','equation-of-a-circle',(1,'centre_radius_expanded'),(2,'write_from_diameter'),(4,'tangent_at_point'))
g('P4.1a','binomial-expansion',(1,'expand_with_numbers,expand_difference'),(2,'find_coefficient,find_term'))
g('P4.3','sequences-series',(1,'sigma_arith_linear'),(2,'sigma_geom'))
g('P4.4','sequences-series',(1,'arith_nth_term,arith_find_d_a,arith_sum_first_n,arith_find_n_from_term'))
g('P4.5','sequences-series',(2,'geom_nth_term,geom_find_r_a,geom_sum_first_n,geom_sum_infinity'))
g('P5.1b','sine-cosine-rule',(1,'sr_find_side,sr_find_angle_general,area_sine'),(2,'cr_find_side,cr_find_angle'))
g('P5.3','trig-graphs-transformations',(1,'identify_standard,state_standard_features'),(3,'combined_sine_cosine,find_equation_from_graph'))
g('P5.5','trigonometric-functions',(3,'basic_identity_proofs,reciprocal_identity_proofs'))
g('P5.7','trig-equation-solver',(1,'basic_trig,shifted_trig'),(2,'quad_sin,quad_cos'))
g('P5.8','trigonometric-functions',(3,'compound_identity_proofs,factorised_identity_proofs,reciprocal_identity_proofs'))
g('P6.1','graph-transformations-curve-sketching',(4,'exponential_transform'))
g('P6.3','logarithms-practice',(1,'log_to_index,index_to_log,evaluate_basic'),(2,'natural_log'))
g('P6.4','logarithms-practice',(2,'product_rule,quotient_rule,power_rule,natural_log'))
g('P6.5','logarithms-practice',(3,'solve_exponential,solve_logarithmic,change_base'))
g('P7.3a','differentiation-polynomials',(3,'gradient_at_point,tangent_equations,normal_equations'))
g('P8.5c','advanced-integration',(2,'sub_log_derivative'))
g('P8.6','integration-algebraic-fractions',(1,'linear_log'),(3,'distinct_linear_pf,repeated_linear_pf'))
g('P8.8','differential-equations',(4,'model_growth_decay,model_cooling,model_condition'))
g('P9.3','numerical-methods',(2,'newton_one_step,newton_two_steps,newton_formula'))
g('P10.1','further-vectors',(1,'position_displacement,magnitude_3d,unit_vector'))
g('P10.2','further-vectors',(1,'magnitude_3d,unit_vector'))
g('P10.3','free-vectors',(1,'add_vectors,subtract_vectors'),(2,'scalar_multiple,scalar_addition'))
g('P10.4','further-vectors',(1,'position_displacement,magnitude_3d,ratio_section'))
g('S1.1a','sampling-methods-bias',(1,'identify_method,identify_bias'),(2,'stratified_sample,systematic_sample,random_process'))
g('S1.1b','sampling-methods-bias',(3,'critique_plan,design_plan,bias_and_improvement'))
g('S2.2','correlation-regression',(1,'interpret_r,correlation_context'),(3,'interpolation_prediction,extrapolation_warning'))
g('S3.2a','tree-diagrams-conditional-probability',(2,'without_replacement_path,complete_conditional'),(3,'total_probability,reverse_conditional'))
g('S3.2b','venn-diagrams',(1,'read_two_set,complete_two_set'),(2,'probability_from_venn,set_formula'))
g('S4.1a','discrete-random-variables',(1,'find_probability,complete_distribution,verify_distribution'))
g('S4.1b','binomial-geometric-distribution',(1,'binomial_exact,binomial_cumulative,binomial_complement'))
g('S4.2a','normal-distribution',(1,'standard_left,standard_between'),(2,'general_left_right,general_between'))
g('S4.2b','normal-distribution',(3,'find_cutoff,find_mu,find_sigma,find_mu_sigma'))
g('S5.2b','hypothesis-testing',(1,'binomial_two_tail,binomial_critical_region'))
g('S5.3','hypothesis-testing',(2,'normal_mean_one_tail,normal_mean_two_tail,normal_critical_value'))
g('M7.3a','equations-of-motion',(1,'find_v,find_s,find_a,find_t'),(2,'stopping_distance,speed_from_distance'))
g('M7.5a','projectiles',(1,'resolve_velocity,time_to_top,maximum_height'),(2,'position_after_time'))
g('M7.5b','projectiles',(2,'range_level_ground,height_at_distance'),(3,'clear_wall,speed_for_range,projected_from_height'))
g('M8.2b','newtons-second-law',(2,'driving_resistance'),(3,'inclined_plane_no_friction,inclined_plane_friction'))
g('M8.3','equations-of-motion',(3,'time_to_top,maximum_height,height_after_time,speed_at_height'))
g('M8.6a','friction',(2,'horizontal_acceleration,pulling_force,pull_at_angle'),(3,'slope_acceleration_down'))
g('M8.6b','friction',(1,'limiting_friction,coefficient_from_friction,static_or_sliding'),(3,'slope_about_to_slide_down,slope_limiting_angle'))
g('M9.1a','moments',(1,'calculate_moment,resultant_moment'),(2,'unknown_force'),(3,'uniform_beam_reactions'))
AP={
'P7.1a':['2.1','5.8'],'P7.1b':['2.2'],'P7.1d':['5.6','5.7'],
'P7.2a':['2.5','2.6'],'P7.2c':['2.10'],'P7.3b':['5.3','5.4'],'P7.3c':['5.11'],
'P7.4a':['2.8','2.9','3.1'],'P7.4b':['4.5'],'P7.4c':['3.3'],
'P7.5a':['3.2'],'P7.5b':['9.1'],'P8.2a':['6.8'],'P8.3a':['6.7'],'P8.3b':['8.4','8.6'],
'P8.4':['6.3'],'P8.5a':['6.9'],'P8.5b':['6.11'],'P8.7':['7.6','7.7'],
'M7.4a':['4.2','8.2']}
PILOT={'P2.3a':'P2.3','S5.2a':'S5.2','M8.2a':'M8.2'}
plans=[]
for row in scope['rows']:
 for i,title in enumerate(row['proposedPacks']):
  id=row['id']+(chr(97+i) if len(row['proposedPacks'])>1 else '')
  plans.append({'id':id,'reference':row['specificationReference'],'area':row['area'],'group':int(row['specificationReference'].split('.')[0]),'title':title,'tools':row['tools'],'mode':'pilot' if id in PILOT else 'generator' if id in GEN else 'ap-adaptation' if id in AP else 'authored','selection':PILOT.get(id) or GEN.get(id) or AP.get(id)})
for e in scope['additionalDataPacks']:plans.append({'id':e['id'],'reference':'Data requirement','area':'Statistics','group':6,'title':e['title'],'tools':[],'mode':'authored','selection':None})
assert len(plans)==140
assert not (set(GEN)|set(AP)|set(PILOT))-{p['id'] for p in plans}
if __name__=='__main__':
 import collections
 out=ROOT/'data/alevel-maths/edexcel-9ma0';out.mkdir(parents=True,exist_ok=True);(out/'plan.json').write_text(json.dumps({'qualification':'9MA0','packs':plans},indent=2)+'\n')
 print(collections.Counter(p['mode'] for p in plans));print('AUTHORED:',', '.join(p['id'] for p in plans if p['mode']=='authored'))
